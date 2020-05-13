import { Routes } from '@angular/router';
import { InventoryComponent } from './components/inventory/inventory.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoryItemComponent } from './components/history-item/history-item.component';
import { BuyoutComponent } from './components/buyout/buyout.component';
import { RoomComponent } from './components/room/room.component'
import { CategoryComponent } from './components/category/category.component';
import {HomeComponent} from './components/home/home.component';
import {AdminComponent} from './components/admin/admin.component';
import {LoginComponent} from './components/login';
import { AuthGuard } from './_guards';
import { Role } from './models';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    { 
        path: 'admin', 
        component: AdminComponent, 
        canActivate: [AuthGuard], 
        data: { roles: [Role.Admin] } 
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' },

    {
        path: 'inventory', component: InventoryComponent
    },
    {
        path: 'user', component: UserComponent
    },
    {
        path: 'dashboard', component: DashboardComponent
    },
    {
        path: 'category', component: CategoryComponent

    },
    {
        path: 'buyout', component: BuyoutComponent
    },
    {
        path: 'rooms', component: RoomComponent
    }
]
