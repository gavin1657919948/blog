import { Injectable } from '@angular/core'
import { Host, Sensor, SensorApi, SystemUserApi, HostApi } from '@uranplus/admin-lb-sdk'
export { Host, Sensor } from '@uranplus/admin-lb-sdk'
import { Observable } from 'rxjs/Observable'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import 'rxjs/add/operator/toPromise'
import { Subscription } from 'rxjs/Subscription'
import * as _ from 'lodash'
import * as moment from 'moment'
import { UiDataGridService, FormService } from '@wushuu/alain-ui'

@Injectable()
export class SensorsService extends UiDataGridService {
  public icon = 'icon-event'
  public title = 'Events'
  public selectedSensor: Sensor
  public tableColumns = [
    { field: 'id', label: '编号', action: 'info' },
    { field: 'name', label: '地址' },
    { field: 'model', label: '型号' },
    { field: 'status', label: '运行状态' },
    { field: 'modified', label: '时间' },
  ]

  columns: any
  constructor(private api: SystemUserApi, private sensorApi: SensorApi, private formService: FormService) {
    super()
    this.columns = this.tableColumns
  }

  setSelectedSensor(sensor: Sensor) {
    this.selectedSensor = sensor
  }

  private getFormFields() {
    return [
      this.formService.input('name', {
        label: '地址',
        placeholder: '地址',
      }),
      this.formService.input('model', {
        label: '型号',
        placeholder: '型号',
      }),
      this.formService.select('status', {
        label: '运行状态',
        defaultValue: 'all',
        options: [{ label: '全部', value: 'all' }, { label: '在线', value: 'on' }, { label: '离线', value: 'off' }],
      }),
      this.formService.date('modified', {
        label: '修改时间',
        placeholder: '修改时间',
      }),
    ]
  }

  getFormConfig() {
    const fields = this.getFormFields()
    return {
      icon: this.icon,
      fields,
      showCancel: true,
      hasHeader: false,
    }
  }

  getItems(): Observable<Sensor[]> {
    // return this.api.getHosts(this.domain.id, this.getFilters())

    return this.api.getSensors(this.domain.id, this.getFilters()).map(data => {
      data.map(item => {
        item.status = '稳定运行'
        item.modified = moment(item.modified).format('YYYY/MM/DD hh:mm:ss')
      })
      return data
    })
  }

  getItem(id): Observable<Sensor> {
    return this.api.findByIdSensors(this.domain.id, id)
  }

  getItemCount(): Observable<any> {
    return this.api.countSensors(this.domain.id, this.getWhereFilters())
  }
  //   getWhereFilters() {
  //     // TODO: need implement
  //   }
  upsertItem(item, successCb, errorCb): Subscription {
    if (item.id) {
      return this.upsertEvent(item, successCb, errorCb)
    }
    return this.createEvent(item, successCb, errorCb)
  }

  upsertEvent(item, successCb, errorCb): Subscription {
    return this.api.updateByIdSensors(this.domain.id, item.id, item).subscribe(successCb, errorCb)
  }

  createEvent(item, successCb, errorCb): Subscription {
    return this.api.createSensors(this.domain.id, item).subscribe(successCb, errorCb)
  }

  deleteItem(item, successCb, errorCb): Subscription {
    return this.api.destroyByIdSensors(this.domain.id, item.id).subscribe(successCb, errorCb)
  }
}
