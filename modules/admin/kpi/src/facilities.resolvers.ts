import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Facility_CN, FacilitiesService } from './facilities.service'

@Injectable()
export class FacilitiesResolver implements Resolve<Facility_CN> {
  constructor(private service: FacilitiesService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Facility_CN> {
    return this.service.getItem(route.params.id)
  }
}
