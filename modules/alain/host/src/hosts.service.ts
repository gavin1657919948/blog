import { Injectable } from '@angular/core'
import { Host, SystemUserApi, HostApi } from '@uranplus/admin-lb-sdk'
export { Host } from '@uranplus/admin-lb-sdk'
import { Observable } from 'rxjs/Observable'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import 'rxjs/add/operator/toPromise'
import { Subscription } from 'rxjs/Subscription'
import * as _ from 'lodash'
import { UiDataGridService, FormService } from '@wushuu/alain-ui'

@Injectable()
export class HostsService extends UiDataGridService {
  public icon = 'icon-event'
  public title = 'Events'
  public selectedHost: Host
  public tableColumns = [
    { field: 'id', label: '编号', action: 'info' },
    { field: 'name', label: '地址' },
    { field: 'model', label: '型号' },
    { field: 'project', label: '所属项目' },
    { field: 'status', label: '运行状态' },
    { field: 'modified', label: '时间' },
  ]

  columns: any
  constructor(private api: SystemUserApi, private hostApi: HostApi, private formService: FormService) {
    super()
    this.columns = this.tableColumns
  }

  setSelectedHost(host: Host) {
    this.selectedHost = host
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
      this.formService.input('project', {
        label: '所属项目',
        placeholder: '所属项目',
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

  getItems(): Observable<Host[]> {
    return this.api.getHosts(this.domain.id, this.getFilters()).map(data => {
      data.map(item => {
        item.status = '稳定运行'
      })
      return data
    })
  }

  getItem(id): Observable<Host> {
    return this.api.findByIdHosts(this.domain.id, id)
  }

  getItemCount(): Observable<any> {
    return this.api.countHosts(this.domain.id, this.getWhereFilters())
  }

  upsertItem(item, successCb, errorCb): Subscription {
    if (item.id) {
      return this.upsertEvent(item, successCb, errorCb)
    }
    return this.createEvent(item, successCb, errorCb)
  }

  upsertEvent(item, successCb, errorCb): Subscription {
    return this.api.updateByIdHosts(this.domain.id, item.id, item).subscribe(successCb, errorCb)
  }

  createEvent(item, successCb, errorCb): Subscription {
    return this.api.createHosts(this.domain.id, item).subscribe(successCb, errorCb)
  }

  deleteItem(item, successCb, errorCb): Subscription {
    return this.api.destroyByIdHosts(this.domain.id, item.id).subscribe(successCb, errorCb)
  }
}
