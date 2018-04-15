import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HostsRoutingModule } from './hosts.routing'
import { HostListComponent } from './components/host-list.component'
import { HostDetailComponent } from './components/host-detail.component'
import { HostFormComponent } from './components/host-form.component'
import { HostInfoComponent } from './components/host-info.component'

import { HasHostsAccess } from './hosts.guards'
import { HostsService } from './hosts.service'
import { HostsResolver } from './hosts.resolvers'

import { AlainUiModule, FormService } from '@wushuu/alain-ui'
import { SharedModule } from '@shared/shared.module'
import { UiDataGridService } from '@wushuu/alain-ui'

@NgModule({
  imports: [CommonModule, FormsModule, HostsRoutingModule, AlainUiModule, SharedModule.forRoot()],
  declarations: [HostListComponent, HostDetailComponent, HostFormComponent, HostInfoComponent],
  providers: [HasHostsAccess, HostsService, HostsResolver, FormService],
})
export class HostsModule {}
