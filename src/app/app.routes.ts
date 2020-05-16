import { Routes } from '@angular/router';
import { InventoryComponent } from './components/inventory/inventory.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoryItemComponent } from './components/history-item/history-item.component';
import { BuyoutComponent } from './components/buyout/buyout.component';
import { RoomComponent } from './components/room/room.component'
import { CategoryComponent } from './components/category/category.component';
import { AuthGuard } from './_guards';
import { Role } from './models';
import { ShopComponent } from './components/shop/shop.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
    {
        path: 'shop',
        component: ShopComponent
    },
    {
        path: 'orders', 
        component: OrdersComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] } 
    },
    {
        path: 'inventory', 
        component: InventoryComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] } 
    },
    {
        path: 'dashboard', 
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] } 
    },
    {
        path: 'category', 
        component: CategoryComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] } 

    },
    {
        path: 'user', 
        component: UserComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] } 
    },
    {
        path: 'buyout', 
        component: BuyoutComponent,
        canActivate: [AuthGuard],
        
    },
    {
        path: 'rooms', 
        component: RoomComponent,
        canActivate: [AuthGuard]
    },

    // otherwise redirect to home
    { path: '**', redirectTo: 'shop' },

]
