import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HasMapAccess } from './map.guards'
import { MapDisplayComponent } from './components/map-display.component'

export const routes: Routes = [
  {
    path: '',
    canActivate: [HasMapAccess],
    children: [
      { path: '', redirectTo: 'display', pathMatch: 'full' },
      {
        path: 'display',
        component: MapDisplayComponent,
        data: { title: 'Display' },
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRoutingModule {}
