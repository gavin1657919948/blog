import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UiTabLink } from '@wushuu/alain-ui'
import { UsersService, Host } from '../../users.service'
import { SystemUserApi } from '@uranplus/admin-lb-sdk'

@Component({
  selector: 'app-user-detail',
  template: `
    <!--nz-tabset>
      <nz-tab *ngFor="let tab of tabs">
        <ng-template #nzTabHeading>
          {{tab.name}}
        </ng-template>
      </nz-tab>
    </nz-tabset-->
    <pro-header title="{{tabs[0].name}}"></pro-header>
    <nz-card [nzBordered]="false">
      <router-outlet></router-outlet>
    </nz-card>
  `,
})
export class UserDetailComponent implements OnInit {
  public tabs: UiTabLink[] = [{ icon: 'fa fa-pencil', name: 'Edit', link: 'edit' }]

  public item: any
  constructor(private service: UsersService, private route: ActivatedRoute, private userApi: SystemUserApi) {}

  ngOnInit() {
    this.item = this.route.snapshot.data.user
    if (!this.item) {
      this.tabs = [{ icon: 'fa fa-plus', name: 'Create', link: '' }]
      this.item = new Host()
    }
    this.service.domain = { id: this.userApi.getCurrentId() }

    this.service.setSelectedUser(this.item)
  }
}
