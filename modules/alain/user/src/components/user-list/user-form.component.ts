import { Component, OnInit, DoCheck } from '@angular/core'
import { FormService, UiService } from '@wushuu/alain-ui'
import { Router } from '@angular/router'
import { UsersService } from '../../users.service'
import { NzMessageService } from 'ng-zorro-antd'

@Component({
  selector: 'app-user-form',
  template: `
    <div class="col-md-6">
      <ui-form *ngIf="item" [config]="formConfig" [item]="item" (action)="handleAction($event)"></ui-form>
    </div>
  `,
  styles: [],
})
export class UserFormComponent implements OnInit, DoCheck {
  public item: any = {}
  public formConfig: any = {}
  constructor(
    private service: UsersService,
    private ui: UiService,
    private router: Router,
    public msg: NzMessageService
  ) {}

  ngOnInit() {
    this.formConfig = this.service.getFormConfig()
    this.item = this.service.selectedUser
  }

  handleAction(event) {
    switch (event.action) {
      case 'save':
        return this.service.upsertItem(
          event.item,
          () => {
            this.msg.create('success', `<u>${event.item.serialNumber}</u> has been saved successfully`)
            this.handleAction({ action: 'cancel' })
          },
          err => this.msg.create('error', `Save User Fail, ${err.message}`)
        )
      case 'cancel':
        return this.router.navigate(['/users'])
      default:
        return console.log(' Unknown User Action:', event)
    }
  }
  ngDoCheck() {}
}
