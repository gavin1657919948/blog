import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HasHostsAccess } from './hosts.guards'
import { HostListComponent } from './components/host-list.component'
import { HostDetailComponent } from './components/host-detail.component'
import { HostFormComponent } from './components/host-form.component'
import { HostInfoComponent } from './components/host-info.component'
import { HostsResolver } from './hosts.resolvers'

export const routes: Routes = [
  {
    path: '',
    canActivate: [HasHostsAccess],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: HostListComponent,
        data: { title: 'List' },
      },
      {
        path: 'create',
        component: HostDetailComponent,
        data: { title: 'Create' },
        children: [
          {
            path: '',
            component: HostFormComponent,
          },
        ],
      },
      {
        path: ':id',
        component: HostDetailComponent,
        resolve: {
          host: HostsResolver,
        },
        children: [
          { path: '', redirectTo: 'info', pathMatch: 'full' },
          {
            path: 'info',
            component: HostInfoComponent,
            data: { title: 'Info' },
          },
          {
            path: 'edit',
            component: HostFormComponent,
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
export class HostsRoutingModule {}
