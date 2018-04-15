import { Injectable } from '@angular/core'
import { Facility_CN, SystemUserApi, FuelType_CNApi, FuelType_CN } from '@uranplus/admin-lb-sdk'
export { Facility_CN } from '@uranplus/admin-lb-sdk'
import { UiDataGridService, FormService } from '@colmena/admin-ui'
import { Observable } from 'rxjs/Observable'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import 'rxjs/add/operator/toPromise'
import { Subscription } from 'rxjs/Subscription'
import * as _ from 'lodash'

@Injectable()
export class FacilitiesService extends UiDataGridService {
  public icon = 'icon-event'
  public title = 'Events'
  public selectedFacility: Facility_CN
  public fuelType$ = new ReplaySubject<number>(1)
  public fuelDefine$ = new ReplaySubject<number>(1)
  public facilityType$ = new ReplaySubject<number>(1)
  public tableColumns = [
    { field: 'serialNumber', label: 'serial No.', action: 'edit' },
    { field: 'facilityType', label: 'facility type' },
    { field: 'fuelType', label: 'flue type' },
    { field: 'fuelDefine', label: 'fuel name' },
    { field: 'powerString', label: 'power' },
    { field: 'date', label: 'date' },
  ]

  /*public fuelTypeList = [
    {
      value: 'solid',
      label: 'solid',
      fuelList: [
        { value: 'anthracite coal', label: 'anthracite coal' },
        { value: 'sub-bituminous coal', label: 'sub-bituminous coal' },
        { value: 'bituminous coal', label: 'bituminous coal' },
        { value: 'lignite', label: 'lignite' },
      ],
    },
    {
      value: 'liquid',
      label: 'liquid',
      fuelList: [
        { value: 'No. 1 fuel oil', label: 'No. 1 fuel oil' },
        { value: 'No. 2 fuel oil', label: 'No. 2 fuel oil' },
        { value: 'No. 4 fuel oil', label: 'No. 4 fuel oil' },
        { value: 'No. 5 fuel oil', label: 'No. 5 fuel oil' },
        { value: 'No. 6 fuel oil', label: 'No. 6 fuel oil' },
        { value: 'No. 7 fuel oil', label: 'No. 7 fuel oil' },
      ],
    },
    {
      value: 'gas',
      label: 'gas',
      fuelList: [{ value: ' natural gas', label: ' natural gas' }],
    },
  ]*/
  _fuelTypeList: Promise<FuelType_CN[]>
  constructor(private api: SystemUserApi, private formService: FormService, private fuelTypeApi: FuelType_CNApi) {
    super()
    this.columns = this.tableColumns
    this._fuelTypeList = this.fuelTypeApi
      .find()
      .map((e: FuelType_CN[]) => e)
      .toPromise()
  }

  setSelectedFacility(facility: Facility_CN) {
    this.selectedFacility = facility
  }

  private get fuelTypeList(): Promise<FuelType_CN[]> {
    return this._fuelTypeList
  }
  private getSelectOptions(fuelTypeList: FuelType_CN[]) {
    return this.fuelType$.combineLatest(
      this.fuelDefine$,
      this.facilityType$,
      (fuelTypeId, fuelDefineId, facilityTypeId) => {
        let fuelTypeOptions = fuelTypeList.map(e => ({
          label: e.name,
          value: e.id,
        }))
        let fuelDefineOptions = []
        let facilityTypeOptions = []

        let fuelType: FuelType_CN = _.findLast(fuelTypeList, (fuelType: FuelType_CN) => fuelType.id == fuelTypeId)

        if (fuelType !== undefined) {
          fuelDefineOptions = fuelType.fuelDefine_CNs.map(e => ({ label: e.name, value: e.id }))
          let fuelDefine = _.findLast(fuelType.fuelDefine_CNs, fuelDefine => fuelDefine.id == fuelDefineId)
          if (fuelDefine !== undefined) {
            facilityTypeOptions = fuelDefine.facilityType_CNs.map(e => ({ label: e.name, value: e.id }))
          }
        }
        return [
          {
            label: 'fuel type',
            defaultValue: fuelTypeId,
            options: fuelTypeOptions,
          },
          {
            label: 'fuel',
            defaultValue: fuelDefineId,
            options: fuelDefineOptions,
          },
          {
            label: 'facility type',
            defaultValue: facilityTypeId,
            options: facilityTypeOptions,
          },
        ]
      }
    )
  }

  private getFormFields() {
    return Observable.fromPromise(this.fuelTypeList).flatMap(fuelTypeList =>
      this.getSelectOptions(fuelTypeList).map(selectOptions => [
        this.formService.input('serialNumber', {
          label: 'serial No.',
          placeholder: 'serial No.',
        }),
        this.formService.select('fuelTypeId', selectOptions[0]),
        this.formService.select('fuelDefineId', selectOptions[1]),
        this.formService.select('facilityTypeId', selectOptions[2]),
        this.formService.input('power', {
          label: 'power',
        }),
        this.formService.select('powerUnit', {
          label: 'power unit',
          defaultValue: 'hp',
          options: [{ label: 'mW', value: 'mW' }, { label: 'hp', value: 'hp' }],
        }),
      ])
    )
  }

  getFormConfig() {
    return this.getFormFields().map(fields => ({
      icon: this.icon,
      fields,
      showCancel: true,
      hasHeader: false,
    }))
  }

  getItems(): Observable<Facility_CN[]> {
    return Observable.fromPromise(this.fuelTypeList).flatMap(fuelTypeList =>
      this.api.getFacilityCns(this.domain.id).map(facilities =>
        facilities.map(facility => {
          let fuelType = _.findLast(fuelTypeList, fuelType => fuelType.id === facility.fuelTypeId)
          let fuelDefine = _.findLast(fuelType.fuelDefine_CNs, fuelDefine => fuelDefine.id === facility.fuelDefineId)
          let facilityType = _.findLast(
            fuelDefine.facilityType_CNs,
            facilityType => facilityType.id === facility.facilityTypeId
          )
          facility.fuelType = fuelType.name
          facility.fuelDefine = fuelDefine.name
          facility.facilityType = facilityType.name
          facility.powerString = facility.power + ' ' + facility.powerUnit
          return facility
        })
      )
    )
  }

  getItem(id): Observable<Facility_CN> {
    return this.api.findByIdFacilityCns(this.domain.id, id)
  }

  getItemCount(): Observable<any> {
    return this.api.countFacilityCns(this.domain.id, this.getWhereFilters())
  }

  upsertItem(item, successCb, errorCb): Subscription {
    if (item.id) {
      return this.upsertEvent(item, successCb, errorCb)
    }
    return this.createEvent(item, successCb, errorCb)
  }

  upsertEvent(item, successCb, errorCb): Subscription {
    return this.api.updateByIdFacilityCns(this.domain.id, item.id, item).subscribe(successCb, errorCb)
  }

  createEvent(item, successCb, errorCb): Subscription {
    return this.api.createFacilityCns(this.domain.id, item).subscribe(successCb, errorCb)
  }

  deleteItem(item, successCb, errorCb): Subscription {
    return this.api.destroyByIdFacilityCns(this.domain.id, item.id).subscribe(successCb, errorCb)
  }
}
