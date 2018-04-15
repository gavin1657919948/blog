import { Component, OnInit, DoCheck } from '@angular/core'
import { FormService, UiService } from '@colmena/admin-ui'
import { Router } from '@angular/router'
import { FacilitiesService } from '../facilities.service'

@Component({
  selector: 'app-kpi-facility-form',
  template: `
    <div class="col-md-6">
      <ui-form *ngIf="item" [config]="formConfig" [item]="item" (action)="handleAction($event)"></ui-form>
    </div>
    <div class="col-md-6">
      <pre>{{item | json}}</pre>
    </div>    
  `,
  styles: [],
})
export class FacilityFormComponent implements OnInit, DoCheck {
  public item: any = {}
  public formConfig: any = {}
  public oldFuelTypeId: number
  public oldFuelDefineId: number
  public oldFacilityTypeId: number
  constructor(private service: FacilitiesService, private ui: UiService, private router: Router) {}

  ngOnInit() {
    this.service.getFormConfig().subscribe(config => (this.formConfig = config))
    this.item = this.service.selectedFacility
  }

  handleAction(event) {
    switch (event.action) {
      case 'save':
        return this.service.upsertItem(
          event.item,
          () => {
            this.ui.alerts.notifySuccess({
              title: 'Save Facility Success',
              body: `<u>${event.item.serialNumber}</u> has been saved successfully`,
            })
            this.handleAction({ action: 'cancel' })
          },
          err =>
            this.ui.alerts.notifyError({
              title: 'Save Facility Fail',
              body: err.message,
            })
        )
      case 'cancel':
        return this.router.navigate(['/kpi/facilities'])
      default:
        return console.log('Unknown Facility Action:', event)
    }
  }
  ngDoCheck() {
    if (this.item.fuelTypeId !== this.oldFuelTypeId) {
      this.oldFuelTypeId = this.item.fuelTypeId
      this.service.fuelType$.next(this.oldFuelTypeId)
    }
    if (this.item.fuelDefineId !== this.oldFuelDefineId) {
      this.oldFuelDefineId = this.item.fuelDefineId
      this.service.fuelDefine$.next(this.oldFuelDefineId)
    }
    if (this.item.facilityTypeId !== this.oldFacilityTypeId) {
      this.oldFacilityTypeId = this.item.facilityTypeId
      this.service.facilityType$.next(this.oldFacilityTypeId)
    }
  }
}
