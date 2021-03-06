import { CanDeactivate } from '@angular/router';
// tslint:disable-next-line:import-spacing
import { Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberListComponent } from './Members/member-list/member-list.component';
import { MemberDetailComponent } from './Members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './Members/member-edit/member-edit.component';
import { resolve } from 'q';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/no-unsaved-changes-guard';


export const appRoutes: Routes = [
{path: 'home', component: HomeComponent},
{path: '', runGuardsAndResolvers : 'always', canActivate: [AuthGuard], children: [
    {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
    {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
       {path: 'member/edit', 
       component: MemberEditComponent, resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
    {path: 'messages', component: MessagesComponent},
    {path: 'lists', component: ListsComponent}
]},

{path: '**', redirectTo: 'home', pathMatch: 'full'}
];
