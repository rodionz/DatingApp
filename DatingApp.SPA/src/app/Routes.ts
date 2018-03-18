// tslint:disable-next-line:import-spacing
import { Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './Guards/auth.guard';
import { MemberListComponent } from './Members/member-list/member-list.component';
import { MemberDetailComponent } from './Members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';


export const appRoutes: Routes = [
{path: 'home', component: HomeComponent},
{path: '', runGuardsAndResolvers : 'always', canActivate: [AuthGuard], children: [
    {path: 'members', component: MemberListComponent, resolve: {users: MemberListResolver}},
    {path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
    {path: 'messages', component: MessagesComponent},
    {path: 'lists', component: ListsComponent}
]},

{path: '**', redirectTo: 'home', pathMatch: 'full'}
];