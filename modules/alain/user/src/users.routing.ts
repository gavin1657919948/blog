import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HasUsersAccess } from './users.guards'
import { UserListComponent } from './components/user-list/user-list.component'
import { UserDetailComponent } from './components/user-list/user-detail.component'
import { UserFormComponent } from './components/user-list/user-form.component'
import { UsersResolver } from './users.resolvers'

export const routes: Routes = [
  {
    path: '',
    canActivate: [HasUsersAccess],
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      {
        path: 'list',
        component: UserListComponent,
        data: { title: 'List' },
      },
      {
        path: 'create',
        component: UserDetailComponent,
        data: { title: 'Create' },
        children: [
          {
            path: '',
            component: UserFormComponent,
          },
        ],
      },
      {
        path: ':id',
        component: UserDetailComponent,
        resolve: {
          user: UsersResolver,
        },
        data: { title: 'Edit' },
        children: [
          { path: '', redirectTo: 'edit', pathMatch: 'full' },
          {
            path: 'edit',
            component: UserFormComponent,
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
export class UsersRoutingModule {}
