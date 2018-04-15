import { Injectable } from '@angular/core'
import { CoreApi } from '@uranplus/admin-lb-sdk'

@Injectable()
export class ModulesService {
  constructor(private coreApi: CoreApi) {}

  getModules() {
    return this.coreApi.modules()
  }
}
