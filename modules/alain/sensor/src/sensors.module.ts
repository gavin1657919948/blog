import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { SensorsRoutingModule } from './sensors.routing'
import { SensorListComponent } from './components/sensor-list/sensor-list.component'
import { SensorDetailComponent } from './components/sensor-list/sensor-detail.component'
import { SensorFormComponent } from './components/sensor-list/sensor-form.component'
import { SensorInfoComponent } from './components/sensor-list/sensor-info.component'

import { HasSensorsAccess } from './sensors.guards'
import { SensorsService } from './sensors.service'
import { SensorsResolver } from './sensors.resolvers'

import { AlainUiModule, FormService } from '@wushuu/alain-ui'
import { SharedModule } from '@shared/shared.module'

@NgModule({
  imports: [CommonModule, FormsModule, SensorsRoutingModule, AlainUiModule, SharedModule.forRoot()],
  declarations: [SensorListComponent, SensorDetailComponent, SensorFormComponent, SensorInfoComponent],
  providers: [HasSensorsAccess, SensorsService, FormService, SensorsResolver],
})
export class SensorsModule {}
