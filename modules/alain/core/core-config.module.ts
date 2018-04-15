import { NgModule } from '@angular/core'
import { Store } from '@ngrx/store'

const moduleName = 'core'

const moduleConfig = {
  name: 'core',
  icon: 'icon-wrench',
  packageName: `@uranplus/module-${moduleName}`,
}
@NgModule()
export class CoreConfigModule {
  constructor(protected store: Store<any>) {
    this.store.dispatch({ type: 'APP_LOAD_MODULE', payload: { moduleName, moduleConfig } })
  }
}
