import { Router } from '@angular/router'
import { Component } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { SettingsService } from '@uranplus/module-core/services/settings.service'
import { Store } from '@ngrx/store'

import * as auth from '@wushuu/module-alain-auth'

@Component({
  selector: 'app-pages-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  valForm: FormGroup

  constructor(public settings: SettingsService, fb: FormBuilder, private router: Router, private store: Store<any>) {
    this.valForm = fb.group({
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required],
      remember_me: [null],
    })
    this.store.select('app').subscribe((res: any) => {
      if (res.settings.nodeEnv === 'development') {
        this.valForm = fb.group({
          email: ['manager@example.com', Validators.compose([Validators.required, Validators.email])],
          password: ['password', Validators.required],
          remember_me: [null],
        })
      }
    })
  }

  submit() {
    // tslint:disable-next-line:forin
    for (const i in this.valForm.controls) {
      this.valForm.controls[i].markAsDirty()
    }
    if (this.valForm.valid) {
      this.login(this.valForm.value)
      // this.router.navigate(['dashboard'])
    }
  }

  login(credentials) {
    this.store.dispatch({ type: auth.ActionTypes.AUTH_LOGIN, payload: credentials })
  }
}
