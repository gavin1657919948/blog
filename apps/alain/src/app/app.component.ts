import { Component, HostBinding, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

import { SettingsService, ThemesService, TitleService } from '@uranplus/module-core'

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  @HostBinding('class.layout-fixed')
  get isFixed() {
    return this.settings.layout.fixed
  }
  @HostBinding('class.layout-boxed')
  get isBoxed() {
    return this.settings.layout.boxed
  }
  @HostBinding('class.aside-collapsed')
  get isCollapsed() {
    return this.settings.layout.collapsed
  }

  constructor(
    private theme: ThemesService,
    private settings: SettingsService,
    private router: Router,
    private titleSrv: TitleService
  ) {}

  ngOnInit() {
    this.router.events
      .filter(evt => evt instanceof NavigationEnd)
      .map(() => this.router.url)
      .subscribe(url => {
        this.titleSrv.setTitleByUrl(url)
      })
  }
}
