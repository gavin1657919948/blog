import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core'
import { FormService, UiService, UiDataGridService } from '@wushuu/alain-ui'
import { Router } from '@angular/router'
import { HostsService } from '../hosts.service'
import { NzMessageService } from 'ng-zorro-antd'
import { HostApi } from '@uranplus/admin-lb-sdk'
import { BehaviorSubject, Subscription, Observable } from 'rxjs/Rx'
import * as moment from 'moment'

@Component({
  selector: 'app-host-info',
  templateUrl: './host-info.component.html',
  styleUrls: ['./host-info.component.scss'],
})
export class HostInfoComponent extends UiDataGridService implements OnInit, DoCheck, OnDestroy {
  public item: any = {}
  public offset: any
  public limit = 10
  public columns = [
    { field: 'id', label: '编号' },
    { field: 'name', label: '地址' },
    { field: 'model', label: '型号' },
    { field: 'status', label: '运行状态' },
    { field: 'modified', label: '时间' },
  ]
  private refresh$ = new BehaviorSubject(null)
  public totalItems
  public items: any[] = []
  loading = false

  constructor(private service: HostsService, private hostApi: HostApi, private formService: FormService) {
    super()
  }

  public refreshData() {
    this.refresh$.next(null)
  }

  subscriptionList: Subscription[] = []

  ngOnInit() {
    this.item = this.service.selectedHost
    this.item.created = moment(this.item.created).format('YYYY/MM/DD HH:mm:ss')
    this.item.modified = moment(this.item.modified).format('YYYY/MM/DD HH:mm:ss')
    this.offset = 0
    const $option = this.refresh$.switchMap(() =>
      this.getSensorCount().zip(this.getSensorData(), (count, data) => ({
        count: count,
        data: data,
      }))
    )

    this.subscriptionList.push(
      $option.subscribe((data: any) => {
        this.items = data.data
        this.totalItems = data.count.count
      })
    )
  }

  getSensorCount(): Observable<any> {
    return this.hostApi.countSensors(this.item.id, {})
  }
  getSensorData(): Observable<any> {
    return this.hostApi.getSensors(this.item.id, this.getFilters()).map(data => {
      data.map(item => {
        item.status = '稳定运行'
      })
      return data
    })
  }

  pageChange(pi: number): Promise<any> {
    this.offset = (pi - 1) * this.service.limit
    this.refreshData()
    this.loading = true
    return new Promise(resolve => {
      setTimeout(() => {
        this.loading = false
        resolve()
      }, 500)
    })
  }

  dataChange(res: any) {}
  pageSizeChange() {
    this.refreshData()
  }

  ngDoCheck() {}

  ngOnDestroy() {
    this.subscriptionList.forEach(item => item.unsubscribe())
  }
}
