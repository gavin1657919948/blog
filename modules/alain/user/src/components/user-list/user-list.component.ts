import { Component, ViewChild, OnInit } from '@angular/core'
import { UsersService } from './../../users.service'
import { Router, ActivatedRoute } from '@angular/router'
import { SystemUserApi } from '@uranplus/admin-lb-sdk'
import { NzMessageService } from 'ng-zorro-antd'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [],
})
export class UserListComponent implements OnInit {
  @ViewChild('grid') private grid

  public facilities = [1, 2, 3]
  private formService: any
  private ui: any
  constructor(
    public service: UsersService,
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
      //return console.log(this.router)
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
