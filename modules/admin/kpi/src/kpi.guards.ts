import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/take'

import { UiService } from '@colmena/admin-ui'

@Injectable()
export class HasKpiAccess implements CanActivate {
  constructor(private store: Store<any>, private ui: UiService) {}

  public canActivate(): Observable<boolean> {
    return this.store
      .select('auth')
      .map((res: any) => res.roles.assigned)
      .map((roles: any) => {
        if (roles.includes('admin')) {
          //TODO change role
          return true
        }
        this.ui.alerts.notifyError({
          title: 'Access Denied',
          body: 'Your assigned roles do not allow access.',
        })
        return false
      })
      .take(1)
  }
}
