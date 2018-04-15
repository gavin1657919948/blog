import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MapRoutingModule } from './map.routing'
import { MapDisplayComponent } from './components/map-display.component'

import { HasMapAccess } from './map.guards'
import { MapService } from './map.service'

import { SharedModule } from '@shared/shared.module'
import { AbmModule } from 'angular-baidu-maps'

@NgModule({
  imports: [
    MapRoutingModule,
    SharedModule,
    AbmModule.forRoot({
      apiKey: 'p3HIQIqLqKVQOXao1IiLp5O0eTFakjEP',
    }),
  ],
  declarations: [MapDisplayComponent],
  providers: [HasMapAccess, MapService],
})
export class MapModule {}
