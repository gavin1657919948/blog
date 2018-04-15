import { Component, Input, OnInit, Output, EventEmitter, TemplateRef, OnDestroy } from '@angular/core'
import { BehaviorSubject, Subscription } from 'rxjs/Rx'

@Component({
  selector: 'ui-data-grid',
  templateUrl: './data-grid.component.html',
})
export class UiDataGridComponent implements OnInit, OnDestroy {
  @Input() limit = 10

  @Input() config: any = {}

  @Input() service: any
  @Output() action = new EventEmitter()

  public items: any[] = []

  subscriptionList: Subscription[] = []

  public totalItems
  public currentPage: any = 1

  public columns = []
  public columnSorting = {}
  loading = false

  private refresh$ = new BehaviorSubject(null)
  isVisible = false
  item

  public refreshData() {
    this.columns = this.service.columns
    this.columnSorting = this.service.columnSorting
    this.limit = this.service.limit
    this.refresh$.next(null)
  }

  ngOnInit() {
    this.service.offset = 0
    this.service.limit = this.limit
    this.columns = this.service.columns
    this.columnSorting = this.service.columnSorting

    const $option = this.refresh$.switchMap(() =>
      this.service.getItemCount().zip(this.service.getItems(), (count, data) => ({
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

    if (!this.config.header) {
      this.config.header = {
        buttons: [{ action: 'add', text: '添加', classNames: 'ant-btn ant-btn-primary' }],
      }
    }
  }

  searchAction(query) {
    this.service.search = query
    this.refreshData()
  }

  setOrder(event) {
    this.service.order = event
    this.refreshData()
  }

  setLimit(limit) {
    this.service.limit = limit
    this.refreshData()
  }

  setOffsetLimit($event) {
    this.service.offset = $event.offset
    this.service.limit = $event.limit
    this.refreshData()
  }

  gridAction(event) {
    switch (event.action) {
      case 'limit':
        return this.setLimit(event.item)
      case 'sort':
        return this.setOrder(event.item)
      case 'offset':
        return this.setOffsetLimit(event.item)
      case 'search':
        return this.searchAction(event.item)
      case 'refresh':
        return this.refreshData()
      case 'delete':
        this.isVisible = true
        this.item = event.item
        return
      default:
        return this.action.emit(event)
    }
  }

  pageChange(pi: number): Promise<any> {
    this.service.offset = (pi - 1) * this.service.limit
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
    this.service.limit = this.limit
    this.refreshData()
  }

  clickItem($event, action, item = null) {
    $event.preventDefault()
    this.gridAction({ action, item })
  }

  handleCancel(event) {
    this.isVisible = false
  }
  handleOk(event) {
    this.isVisible = false
    this.action.emit({ action: 'delete', item: this.item })
  }

  ngOnDestroy() {
    this.subscriptionList.forEach(item => item.unsubscribe())
  }
}
