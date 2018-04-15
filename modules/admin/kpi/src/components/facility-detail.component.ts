import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UiTabLink } from '@colmena/admin-ui'
import { FacilitiesService, Facility_CN } from '../facilities.service'
import { SystemUserApi } from '@uranplus/admin-lb-sdk'

@Component({
  selector: 'app-facility-detail',
  template: `
    <ui-page [tabs]="tabs" [title]="item ? item.name : 'Add New Event'">
      <router-outlet></router-outlet>
    </ui-page>
  `,
})
export class FacilityDetailComponent implements OnInit {
  public tabs: UiTabLink[] = [{ icon: 'fa fa-pencil', title: 'Edit', link: 'edit' }]

  public item: any
  public oldFuelTypeId: number
  public oldFuelDefineId: number
  public oldFacilityTypeId: number
  constructor(private service: FacilitiesService, private route: ActivatedRoute, private userApi: SystemUserApi) {}

  ngOnInit() {
    this.item = this.route.snapshot.data.facility
    if (!this.item) {
      this.tabs = [{ icon: 'fa fa-plus', title: 'Create', link: '' }]
      this.item = new Facility_CN()
      this.item.fuelTypeId = null
      this.item.fuelDefineId = null
      this.item.facilityTypeId = null
    }
    this.service.domain = { id: this.userApi.getCurrentId() }

    this.service.setSelectedFacility(this.item)
  }
}
