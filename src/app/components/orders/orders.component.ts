import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  displayedColumns = ['position', 'orderId', 'username' , 'totalProducts' , 'totalOrderValue'];
  dataSource;
  constructor(private router:Router,private ordersService:OrdersService) { }

  ngOnInit() {
    this.ordersService.getAllOrders().pipe(first())
    .subscribe(
        response => {
          this.dataSource = response;
        },
        error => {
          console.log("Error while fetching the orders");
        });
  }
  
  getRecord = (row)=>{
    this.ordersService.recordClicked=row;
    this.router.navigate(['/userorder'])
    console.log(this.ordersService.recordClicked)
  } 
}

export interface UsersOrders {
  position: number;
  orderId: number;
  username: string;
  products: number;
  total: string;
}
