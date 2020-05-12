import { Routes } from '@angular/router';
import { InventoryComponent } from './components/inventory/inventory.component';
import { UserComponent } from './components/user/user.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoryItemComponent } from './components/history-item/history-item.component';
import { BuyoutComponent } from './components/buyout/buyout.component';
import { RoomComponent } from './components/room/room.component'
import { CategoryComponent } from './components/category/category.component';
export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
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
