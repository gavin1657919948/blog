import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Host, HostsService } from './hosts.service'

@Injectable()
export class HostsResolver implements Resolve<Host> {
  constructor(private service: HostsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Host> {
    return this.service.getItem(route.params.id)
  }
}
