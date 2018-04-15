import { Component } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd'
import { SettingsService } from '@uranplus/module-core/services/settings.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  constructor(public settings: SettingsService, public msgSrv: NzMessageService) {}
}
