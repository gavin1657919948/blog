import { Injectable } from '@angular/core'
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router'
import { Observable } from 'rxjs/Observable'

import { Sensor, SensorsService, Host } from './sensors.service'

@Injectable()
export class SensorsResolver implements Resolve<Sensor> {
  constructor(private service: SensorsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Sensor> {
    return this.service.getItem(route.params.id)
  }
}
