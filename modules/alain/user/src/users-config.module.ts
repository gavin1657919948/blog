import { NgModule } from '@angular/core'
import { Store } from '@ngrx/store'

const moduleName = 'user'

const link = (...links) => ['/', moduleName, ...links]

const moduleConfig = {
  name: 'user',
  icon: 'icon-wrench',
  packageName: `@uranplus/module-alain-${moduleName}`,
}
@NgModule()
export class UsersConfigModule {
  constructor(protected store: Store<any>) {
    this.store.dispatch({ type: 'APP_LOAD_MODULE', payload: { moduleName, moduleConfig } })
  }
}
