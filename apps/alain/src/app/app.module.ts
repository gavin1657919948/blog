import { BrowserModule } from '@angular/platform-browser'
import { NgModule, LOCALE_ID, APP_INITIALIZER, Injector } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http'
import { LocalStorageService } from 'angular-web-storage'

import {
  CoreModule,
  StartupService,
  MenuService,
  TranslatorService,
  SettingsService,
  TokenInterceptor,
} from '@uranplus/module-core'
import { SharedModule } from './shared/shared.module'
import { AppComponent } from './app.component'
import { RoutesModule } from './routes/routes.module'
import { LayoutModule } from './layout/layout.module'

import { LoopBackConfig, SDKBrowserModule } from '@uranplus/admin-lb-sdk'
import { AlainUiModule } from '@wushuu/alain-ui'

// Local Components/Routes/Services
import { AppConfigModule } from './app-config.module'
import { AppStoreModule } from './app.store'

import { ExtensionsModule } from './extensions.module'

import { AppService } from './app.service'
import { LogService } from './log.service'

import { registerLocaleData } from '@angular/common'
import localeZhHans from '@angular/common/locales/zh-Hans'
registerLocaleData(localeZhHans)

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `assets/i18n/`, '.json')
}

export function StartupServiceFactory(startupService: StartupService): Function {
  return () => startupService.load()
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    CoreModule,
    LayoutModule,
    RoutesModule,

    SDKBrowserModule.forRoot(),
    AppConfigModule,
    AppStoreModule,
    AlainUiModule.forRoot(),
    ExtensionsModule,

    // i18n
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'zh-Hans' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true,
    },
    AppService,
    LogService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  configureLoopBack() {
    const apiConfig = JSON.parse(window.localStorage.getItem('apiConfig'))

    LoopBackConfig.setBaseURL(apiConfig.baseUrl)
    LoopBackConfig.setApiVersion(apiConfig.version)
    LoopBackConfig.filterOnUrl()
    this.logService.info(`Configure LoopBack: ${apiConfig.baseUrl}/${apiConfig.version}`)
  }

  constructor(private appService: AppService, private logService: LogService) {
    this.configureLoopBack()
    this.appService.fetchSettings()
    this.appService.fetchDomains()
  }
}
