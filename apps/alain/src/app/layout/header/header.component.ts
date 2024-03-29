import { Component, ViewChild } from '@angular/core'
import { SettingsService } from '@uranplus/module-core/services/settings.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  searchToggleStatus: boolean

  constructor(public settings: SettingsService) {}

  toggleCollapsedSideabar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed)
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus
  }
}
