import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HasSensorsAccess } from './sensors.guards'
import { SensorListComponent } from './components/sensor-list/sensor-list.component'
import { SensorDetailComponent } from './components/sensor-list/sensor-detail.component'
import { SensorFormComponent } from './components/sensor-list/sensor-form.component'
import { SensorsResolver } from './sensors.resolvers'
import { SensorInfoComponent } from './components/sensor-list/sensor-info.component'

export const routes: Routes = [
  {
    path: '',
    canActivate: [HasSensorsAccess],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: SensorListComponent,
        data: { title: 'List' },
      },
      {
        path: 'create',
        component: SensorDetailComponent,
        data: { title: 'Create' },
        children: [
          {
            path: '',
            component: SensorFormComponent,
          },
        ],
      },
      {
        path: ':id',
        component: SensorDetailComponent,
        resolve: {
          sensor: SensorsResolver,
        },
        children: [
          { path: '', redirectTo: 'edit', pathMatch: 'full' },
          {
            path: 'info',
            component: SensorInfoComponent,
            data: { title: 'Info' },
          },
          {
            path: 'edit',
            component: SensorFormComponent,
            data: { title: 'Edit' },
          },
        ],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SensorsRoutingModule {}
