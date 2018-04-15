import { NgModule } from '@angular/core'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { ActionReducer, combineReducers, ActionReducerMap } from '@ngrx/store'
import * as auth from '@wushuu/module-alain-auth'
import * as app from './state'
import { environment } from '../environments/environment' // Angular CLI environment
import { SystemUserApi } from '@uranplus/admin-lb-sdk'

export interface State {
  app: app.State
  auth: auth.State
}

const reducers: ActionReducerMap<State> = {
  app: app.reducer,
  auth: auth.reducer,
}

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument({}) : [],
    EffectsModule.forRoot([app.AppEffects, auth.AuthEffects]),
  ],
})
export class AppStoreModule {}
