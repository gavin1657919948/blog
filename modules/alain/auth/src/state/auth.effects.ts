import { get } from 'lodash'
import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { SystemUserApi } from '@uranplus/admin-lb-sdk'

import * as auth from './auth.actions'
import { NzMessageService } from 'ng-zorro-antd'
import { SettingsService } from '@uranplus/module-core'

@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  login: Observable<Action> = this.actions$.ofType(auth.ActionTypes.AUTH_LOGIN).do((action: any) => {
    this.userApi.login(action.payload, 'user', true).subscribe(
      success => {
        this.store.dispatch({ type: 'AUTH_GET_USER_ROLES', payload: success })
        this.store.dispatch(new auth.AuthLoginSuccessAction(success))
      },
      error => this.store.dispatch(new auth.AuthLoginErrorAction(error))
    )
  })

  @Effect({ dispatch: false })
  loginError: Observable<Action> = this.actions$.ofType(auth.ActionTypes.AUTH_LOGIN_ERROR).do(action =>
    this.notifyError({
      title: get(action, 'payload.name'),
      body: get(action, 'payload.message'),
    })
  )

  @Effect({ dispatch: false })
  loginSuccess: Observable<Action> = this.actions$.ofType(auth.ActionTypes.AUTH_LOGIN_SUCCESS).do((action: any) => {
    window.localStorage.setItem('token', JSON.stringify(action.payload))
    this.notifySuccess({
      title: 'Sign In Successful',
      body: `用户 ${get(action, 'payload.user.email') + '登录成功'}`,
    })
    this.service.setUser(get(action, 'payload.user'))
    return this.store.dispatch({ type: 'APP_REDIRECT_ROUTER' })
  })

  @Effect({ dispatch: false })
  register: Observable<Action> = this.actions$.ofType(auth.ActionTypes.AUTH_REGISTER).do((action: any) => {
    this.userApi.create(action.payload).subscribe(
      (success: any) =>
        this.store.dispatch(
          new auth.AuthRegisterSuccessAction({
            realm: action.payload.realm,
            email: action.payload.email,
            password: action.payload.password,
          })
        ),
      error => this.store.dispatch(new auth.AuthRegisterErrorAction(error))
    )
  })

  @Effect({ dispatch: false })
  registerSuccess: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.AUTH_REGISTER_SUCCESS)
    .do((action: any) => {
      this.notifySuccess({
        title: 'Successfully registered',
        body: `${action.payload.email} has been created`,
      })
      return this.store.dispatch(new auth.AuthLoginAction(action.payload))
    })

  @Effect({ dispatch: false })
  registerError: Observable<Action> = this.actions$.ofType(auth.ActionTypes.AUTH_REGISTER_ERROR).do(action =>
    this.notifyError({
      title: get(action, 'payload.name'),
      body: get(action, 'payload.message'),
    })
  )

  @Effect({ dispatch: false })
  logout: Observable<Action> = this.actions$.ofType(auth.ActionTypes.AUTH_LOGOUT).do(() => {
    window.localStorage.removeItem('token')
    this.userApi
      .logout()
      .subscribe(
        success => this.store.dispatch(new auth.AuthLogoutSuccessAction(success)),
        error => this.store.dispatch(new auth.AuthLogoutErrorAction(error))
      )
  })

  @Effect({ dispatch: false })
  logoutError: Observable<Action> = this.actions$.ofType(auth.ActionTypes.AUTH_LOGOUT_ERROR).do(action => {
    window.localStorage.removeItem('token')
    this.notifyError({
      title: get(action, 'payload.name'),
      body: get(action, 'payload.message'),
    })
    return this.store.dispatch({ type: 'APP_REDIRECT_ROUTER' })
  })

  @Effect({ dispatch: false })
  logoutSuccess: Observable<Action> = this.actions$.ofType(auth.ActionTypes.AUTH_LOGOUT_SUCCESS).do(() => {
    window.localStorage.removeItem('token')
    this.notifySuccess({
      title: 'Log Out Successful',
      body: 'You are logged out',
    })
    return this.store.dispatch({ type: 'APP_REDIRECT_ROUTER' })
  })

  @Effect({ dispatch: false })
  getUserInfo$ = this.actions$.ofType('AUTH_GET_USER_ROLES').do((action: any) => {
    this.userApi.info(action.payload.userId).subscribe(res => {
      window.localStorage.setItem('roles', JSON.stringify(res.roles))
      this.store.dispatch({ type: 'AUTH_SET_ROLES', payload: res.roles })
    })
  })

  @Effect({ dispatch: false })
  checkToken: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.AUTH_CHECK_TOKEN)
    .do(() =>
      this.userApi
        .getCurrent()
        .subscribe(
          success => this.store.dispatch(new auth.AuthCheckTokenSuccessAction(success)),
          error => this.store.dispatch(new auth.AuthCheckTokenErrorAction(error))
        )
    )

  @Effect({ dispatch: false })
  checkTokenError: Observable<Action> = this.actions$.ofType(auth.ActionTypes.AUTH_CHECK_TOKEN_ERROR).do(action => {
    this.notifyError({
      title: 'Invalid Token',
      body: 'Redirecting to login screen',
    })
    return this.store.dispatch({ type: 'APP_REDIRECT_LOGIN' })
  })

  @Effect({ dispatch: false })
  checkTokenSuccess: Observable<Action> = this.actions$.ofType(auth.ActionTypes.AUTH_CHECK_TOKEN_SUCCESS).do(() => {
    this.notifySuccess({
      title: 'Valid Token',
      body: 'It all looks good :)',
    })
    return true
  })

  notifySuccess(message) {
    this.msg.create('success', message.body, {
      nzDuration: 3000,
    })
  }

  notifyError(message) {
    this.msg.create('error', message.body, {
      nzDuration: 3000,
    })
  }
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private userApi: SystemUserApi,
    private msg: NzMessageService,
    private service: SettingsService
  ) {}
}
