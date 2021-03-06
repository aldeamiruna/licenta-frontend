import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatCheckboxModule, MatDialogModule,MatCardModule } from '@angular/material';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { AddItemComponent } from './components/add-item/add-item.component';

import { UserComponent } from './components/user/user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { ItemRowComponent } from './components/item-row/item-row.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HistoryItemComponent } from './components/history-item/history-item.component';
import { RoomComponent } from './components/room/room.component';
import {RoomRowComponent} from './components/room-row/room-row.component';
import {DetailsRoomComponent} from "./components/details-room/details-room.component"
import { DocViewComponent } from './components/doc-view/doc-view.component';
import { AddParamsComponent } from './components/add-params/add-params.component';
import { ParamComponent } from './components/param/param.component';
import {CategoryComponent} from './components/category/category.component';
import { BuyoutComponent } from './components/buyout/buyout.component';
import { UserRowComponent } from './components/user-row/user-row.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { EditDocComponent } from './components/edit-doc/edit-doc.component';
import { EditableTextComponent } from './components/editable-text/editable-text.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule }    from '@angular/forms';
import {HomeComponent} from './components/home/home.component';

// used to create fake backend
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './_helpers';
import { RegisterComponent } from './components/register/register.component';
import { AlertComponent } from './components/alert/alert.component';
import { OrdersComponent } from './components/orders/orders.component';
import { UserOrderComponent } from './components/user-order/user-order.component';
import { CartComponent } from './components/cart/cart.component';
import {CoursesComponent} from './components/courses/courses.component';
import {SoftwareComponent} from './components/software/software.component';
import { LaptopComponent } from './components/laptop/laptop.component';

@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    AddItemComponent,
    UserComponent,
    AddUserComponent,
    ItemRowComponent,
    CategoryComponent,
    UserRowComponent,
    DashboardComponent,
    DocViewComponent,
    AddParamsComponent,
    ParamComponent,
    BuyoutComponent,
    RoomComponent,
    RoomRowComponent,
    DetailsRoomComponent,
    HistoryItemComponent,
    EditDocComponent,
    EditableTextComponent,
    LoginComponent,
    LaptopComponent,
    RegisterComponent,
    AlertComponent,
    OrdersComponent,
    UserOrderComponent,
    CartComponent,
    CoursesComponent,
    SoftwareComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MatTableModule,
    MatCheckboxModule,
    PdfViewerModule,
    MatCardModule,
    BrowserAnimationsModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

    // provider used to create fake backend
    fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
