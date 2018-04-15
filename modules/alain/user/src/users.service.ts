import { Injectable } from '@angular/core'
import { Host, SystemUser, SystemUserApi, HostApi } from '@uranplus/admin-lb-sdk'
export { Host, SystemUser } from '@uranplus/admin-lb-sdk'
import { Observable } from 'rxjs/Observable'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import 'rxjs/add/operator/toPromise'
import { Subscription } from 'rxjs/Subscription'
import * as _ from 'lodash'
import * as moment from 'moment'
import { UiDataGridService, FormService } from '@wushuu/alain-ui'
import { error } from 'selenium-webdriver'

@Injectable()
export class UsersService extends UiDataGridService {
  public icon = 'icon-event'
  public title = 'Events'
  public selectedUser: SystemUser
  public tableColumns = [
    { field: 'id', label: '编号', action: 'edit' },
    { field: 'username', label: '用户昵称' },
    { field: 'roles', label: '身份' },
    { field: 'modified', label: '时间' },
  ]

  // _fuelTypeList: Promise<Host[]>
  columns: any
  constructor(private api: SystemUserApi, private hostApi: HostApi, private formService: FormService) {
    super()
    this.columns = this.tableColumns
  }

  setSelectedUser(user: SystemUser) {
    this.selectedUser = user
  }

  // private get fuelTypeList(): Promise<Host[]> {
  //   return this._fuelTypeList
  // }
  // private getSelectOptions(fuelTypeList: Host[]) {
  //   return Observable.of([])
  // }

  private getFormFields() {
    return [
      this.formService.input('username', {
        label: '用户昵称',
        placeholder: '用户昵称',
      }),
      this.formService.input('email', {
        label: '邮箱',
        placeholder: '邮箱',
      }),
      this.formService.input('firstName', {
        label: '姓',
        placeholder: '姓',
      }),
      this.formService.input('lastName', {
        label: '名',
        placeholder: '名',
      }),
      this.formService.password('password', {
        label: '密码',
        placeholder: '密码',
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

  getItems(): Observable<SystemUser[]> {
    return this.api.find(this.getFilters())
  }

  getItem(id): Observable<SystemUser> {
    //return this.api.findById(this.domain.id, id)
    return this.api.findById(id, this.getFilters())
  }

  getItemCount(): Observable<any> {
    return this.api.count(this.getFilters())
  }
  // getWhereFilters() {
  //   // TODO: need implement
  // }
  upsertItem(item, successCb, errorCb): Subscription {
    if (item.id) {
      return this.upsertEvent(item, successCb, errorCb)
    }
    return this.createEvent(item, successCb, errorCb)
  }

  upsertEvent(item, successCb, errorCb): Subscription {
    return this.api.updateAttributes(item.id, item).subscribe(successCb, errorCb)
  }

  createEvent(item, successCb, errorCb): Subscription {
    return this.api.create(item).subscribe(successCb, errorCb)
  }

  deleteItem(item, successCb, errorCb): Subscription {
    return this.api.destroyByIdAccessTokens(this.domain.id, item.id).subscribe(successCb, errorCb)
  }
}
