import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store } from '@ngrx/store'
import { NzMessageService } from 'ng-zorro-antd'

@Component({
  template: ``,
})
export class RouterComponent implements OnInit, OnDestroy {
  _id
  constructor(private store: Store<any>, private _message: NzMessageService) {}
  ngOnInit() {
    this._id = this._message.loading('Redirecting...', { nzDuration: 0 }).messageId
    this.store.select('auth').subscribe((res: any) => {
      console.log('RouterComponent.ngOnInit() auth=', res)
      return this.store.dispatch({ type: res.loggedIn ? 'APP_REDIRECT_DASHBOARD' : 'APP_REDIRECT_LOGIN' })
    })
  }
  ngOnDestroy() {
    this._message.remove(this._id)
  }
}
