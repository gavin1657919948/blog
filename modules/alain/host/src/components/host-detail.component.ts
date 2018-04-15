import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UiTabLink } from '@wushuu/alain-ui'
import { HostsService, Host } from '../hosts.service'
import { SystemUserApi } from '@uranplus/admin-lb-sdk'

@Component({
  selector: 'app-host-detail',
  template: `
    <pro-header title="{{ title }}"></pro-header>
    <nz-card [nzBordered]="false">
      <router-outlet></router-outlet>
    </nz-card>
  `,
})
export class HostDetailComponent implements OnInit {
  // public tabs: UiTabLink[] = [{ icon: 'fa fa-pencil', name: 'Edit', link: 'edit' }]

  public item: any
  public title: any
  constructor(private service: HostsService, private route: ActivatedRoute, private userApi: SystemUserApi) {}

  ngOnInit() {
    this.item = this.route.snapshot.data.host
    this.title = '主机 ' + this.item.id
    if (!this.item) {
      this.item = new Host()
    }
    this.service.domain = { id: this.userApi.getCurrentId() }

    this.service.setSelectedHost(this.item)
  }
}
