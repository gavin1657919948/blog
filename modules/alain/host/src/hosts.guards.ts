import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'

import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/take'

@Injectable()
export class HasHostsAccess implements CanActivate {
  constructor(private store: Store<any>) {}

  public canActivate(): Observable<boolean> {
    return this.store
      .select('auth')
      .map((res: any) => res.roles.assigned)
      .map((roles: any) => {
        if (roles.includes('admin') || roles.includes('manager') || roles.includes('staff')) {
          // TODO change role
          return true
        }
        // TODO add alert
        console.log({
          title: 'Access Denied',
          body: 'Your assigned roles do not allow access.',
        })
        return false
      })
      .take(1)
  }
}
