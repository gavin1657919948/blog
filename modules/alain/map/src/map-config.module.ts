import { NgModule } from '@angular/core'
import { Store } from '@ngrx/store'

const moduleName = 'map'

const link = (...links) => ['/', moduleName, ...links]

const moduleConfig = {
  name: 'map',
  icon: 'icon-wrench',
  packageName: `@uranplus/module-alain-${moduleName}`,
}
@NgModule()
export class MapConfigModule {
  constructor(protected store: Store<any>) {
    this.store.dispatch({ type: 'APP_LOAD_MODULE', payload: { moduleName, moduleConfig } })
  }
}
