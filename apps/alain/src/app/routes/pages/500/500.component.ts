import { Component } from '@angular/core'
import { SettingsService } from '@uranplus/module-core/services/settings.service'

@Component({
  selector: 'app-pages-500',
  templateUrl: './500.component.html',
})
export class Page500Component {
  constructor(public settings: SettingsService) {}
}
