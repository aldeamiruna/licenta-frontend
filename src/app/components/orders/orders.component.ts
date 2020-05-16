import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  displayedColumns = ['position', 'username', 'products', 'total'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
  }

  getRecord = (row)=>{
    console.log(row)
  }  
}

export interface UsersOrders {
  position: number;
  username: string;
  products: number;
  total: string;
}

const ELEMENT_DATA: UsersOrders[] = [
  {position: 1, username: 'Hydrogen', products: 1, total: '10$'},
  {position: 2, username: 'Helium', products: 4, total: '20$'},
  {position: 3, username: 'Lithium', products: 6, total: '100$'},
  {position: 4, username: 'Beryllium', products: 9, total: '240$'},
  {position: 5, username: 'Boron', products: 10, total: '50$'},
  {position: 6, username: 'Carbon', products: 12, total: '100$'},
  {position: 7, username: 'Nitrogen', products: 14, total: '300$'},
  {position: 8, username: 'Oxygen', products: 15, total: '200$'},
  {position: 9, username: 'Fluorine', products: 18, total: '1000$'},
  {position: 10, username: 'Neon', products: 20, total: '30$'},
];

  
  

