import { Injectable } from '@angular/core'
import { assign, noop } from 'lodash'

import { NzMessageService } from 'ng-zorro-antd'

@Injectable()
export class UiService {
  constructor(public msg: NzMessageService) {}
}
