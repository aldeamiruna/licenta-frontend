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
import { OrdersComponent } from './components/orders/orders.component';
import { UserOrderComponent } from './components/user-order/user-order.component';
import { CartComponent } from './components/cart/cart.component';
import { CoursesComponent } from './components/courses/courses.component';
import { SoftwareComponent } from './components/software/software.component';
import { HomeComponent } from './components/home/home.component';
import { LaptopComponent } from './components/laptop/laptop.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'laptop',
        component: LaptopComponent
    },
    {
        path: 'software',
        component: SoftwareComponent
    },
    {
        path: 'courses',
        component: CoursesComponent
    },
    {
        path: 'cart', 
        component: CartComponent
    },
    {
        path: 'orders', 
        component: OrdersComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin] } 
    },
    {
        path: 'userorder', 
        component: UserOrderComponent,
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
    { path: '**', redirectTo: 'home' },

]
