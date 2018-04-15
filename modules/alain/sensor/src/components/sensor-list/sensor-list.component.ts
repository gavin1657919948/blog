import { Component, ViewChild, OnInit } from '@angular/core'
import { SensorsService } from './../../sensors.service'
import { Router, ActivatedRoute } from '@angular/router'
import { SystemUserApi } from '@uranplus/admin-lb-sdk'
import { NzMessageService } from 'ng-zorro-antd'

@Component({
  selector: 'app-censor-list',
  templateUrl: './sensor-list.component.html',
  styles: [],
})
export class SensorListComponent implements OnInit {
  @ViewChild('grid') private grid

  public config = { header: {} }
  public facilities = [1, 2, 3]
  private formService: any
  private ui: any
  constructor(
    public service: SensorsService,
    private router: Router,
    private route: ActivatedRoute,
    private userApi: SystemUserApi,
    public msg: NzMessageService
  ) {
    this.service.domain = { id: userApi.getCurrentId() }
  }
  ngOnInit() {}

  action(event) {
    switch (event.action) {
      case 'edit':
        return this.router.navigate([event.item.id], {
          relativeTo: this.route.parent,
        })
      case 'info':
        return this.router.navigate([event.item.id, 'info'], {
          relativeTo: this.route.parent,
        })
      case 'add':
        return this.router.navigate(['create'], {
          relativeTo: this.route.parent,
        })
      case 'delete':
        return this.service.deleteItem(
          event.item,
          () => this.grid.refreshData(),
          err => this.msg.create('error', 'Error Deleting item: ' + err.message)
        )
      default:
        return console.log('Unknown event Action', event)
    }
  }
}
