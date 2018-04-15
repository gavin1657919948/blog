import { Component } from '@angular/core'
import { Store } from '@ngrx/store'

import * as auth from '@wushuu/module-alain-auth'
import { SettingsService } from '@uranplus/module-core/services/settings.service'

@Component({
  template: `
  <div class="abs-center width-lg">
  <div class="py-lg text-center">
      <nz-avatar [nzIcon]="'user'" [nzSize]="'large'"></nz-avatar>
  </div>
  <nz-card [nzBordered]="false">
      <p class="mb-sm">You are being logged out.</p>
  </nz-card>
  <div class="p-lg text-center text-sm">
      &copy; {{ settings.app.year }} - {{ settings.app.name }}
      <br> {{ settings.app.description }}
  </div>
</div>
`,
})
export class LogoutComponent {
  constructor(private store: Store<any>, public settings: SettingsService) {
    this.store.dispatch(new auth.AuthLogoutAction())
  }
}
