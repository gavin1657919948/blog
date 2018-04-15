import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Host, UsersService, SystemUser } from './users.service'

@Injectable()
export class UsersResolver implements Resolve<SystemUser> {
  constructor(private service: UsersService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SystemUser> {
    return this.service.getItem(route.params.id)
  }
}
