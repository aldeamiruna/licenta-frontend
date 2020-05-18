import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/services/orders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  displayedColumns = ['position', 'orderId', 'username', 'products', 'total'];
  dataSource = ELEMENT_DATA;
  constructor(private router:Router,private ordersService:OrdersService) { }

  ngOnInit() {
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

const ELEMENT_DATA: UsersOrders[] = [
  {position: 1, orderId:1, username: 'Hydrogen', products: 1, total: '10$'},
  {position: 2, orderId:2, username: 'Helium', products: 4, total: '20$'},
  {position: 3, orderId:3, username: 'Lithium', products: 6, total: '100$'},
  {position: 4, orderId:4, username: 'Beryllium', products: 9, total: '240$'},
  {position: 5, orderId:5, username: 'Boron', products: 10, total: '50$'},
  {position: 6, orderId:6, username: 'Carbon', products: 12, total: '100$'},
  {position: 7, orderId:7, username: 'Nitrogen', products: 14, total: '300$'},
  {position: 8, orderId:8, username: 'Oxygen', products: 15, total: '200$'},
  {position: 9, orderId:9, username: 'Fluorine', products: 18, total: '1000$'},
  {position: 10, orderId:10, username: 'Neon', products: 20, total: '30$'},
];

  
  

