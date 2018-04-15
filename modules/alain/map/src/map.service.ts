import { Injectable } from '@angular/core'
import { Location, SystemUser, SystemUserApi, LocationApi } from '@uranplus/admin-lb-sdk'
export { Location } from '@uranplus/admin-lb-sdk'
import { Observable } from 'rxjs/Observable'
import { ReplaySubject } from 'rxjs/ReplaySubject'
import 'rxjs/add/operator/toPromise'
import { Subscription } from 'rxjs/Subscription'
import { UiDataGridService, FormService } from '@wushuu/alain-ui'

@Injectable()
export class MapService {
  constructor(private api: SystemUserApi, private locationApi: LocationApi) {}

  getItems(bssw, bsne): Observable<any> {
    return this.locationApi.find({
      include: 'hosts',
      where: { longitude: { between: [bssw.lng, bsne.lng] }, latitude: { between: [bssw.lat, bsne.lat] } },
    })
  }
}
