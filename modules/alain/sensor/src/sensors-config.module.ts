import { NgModule } from '@angular/core'
import { Store } from '@ngrx/store'

const moduleName = 'sensor'

const link = (...links) => ['/', moduleName, ...links]

const moduleConfig = {
  name: 'sensors',
  icon: 'icon-wrench',
  packageName: `@uranplus/module-alain-${moduleName}`,
}
@NgModule()
export class SensorsConfigModule {
  constructor(protected store: Store<any>) {
    this.store.dispatch({ type: 'APP_LOAD_MODULE', payload: { moduleName, moduleConfig } })
  }
}
