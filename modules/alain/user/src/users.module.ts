import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { UsersRoutingModule } from './users.routing'
import { UserListComponent } from './components/user-list/user-list.component'
import { UserDetailComponent } from './components/user-list/user-detail.component'
import { UserFormComponent } from './components/user-list/user-form.component'

import { HasUsersAccess } from './users.guards'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolvers'

import { AlainUiModule, FormService } from '@wushuu/alain-ui'
import { SharedModule } from '@shared/shared.module'
import { UiDataGridService } from '@wushuu/alain-ui'

@NgModule({
  imports: [CommonModule, FormsModule, UsersRoutingModule, AlainUiModule, SharedModule.forRoot()],
  declarations: [UserListComponent, UserDetailComponent, UserFormComponent],
  providers: [HasUsersAccess, UsersService, UsersResolver, FormService],
})
export class UsersModule {}
