import {Component} from '@angular/core';

export interface UserOrderProducts {
  position:number;
  product: string;
  value: number;
}

/**
 * @title Footer row table
 */
@Component({
  selector: 'app-user-order',
  styleUrls: ['user-order.component.css'],
  templateUrl: 'user-order.component.html',
})
export class UserOrderComponent {
  displayedColumns: string[] = ['position', 'product', 'value'];
  products: UserOrderProducts[] = [
      {position: 1, product: 'SoftX', value: 10},
      {position: 2, product: 'SoftY', value: 12},
      {position: 3, product: 'SoftZ', value: 6},
      {position: 4, product: 'CourseJava', value: 45},
      {position: 5, product: 'CourseC#', value: 10},
    ];

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    return this.products.map(t => t.value).reduce((acc, valuep) => acc + valuep, 0);
  }
}




// import { Component, OnInit } from '@angular/core';
// import { MatTableDataSource } from '@angular/material';

// @Component({
//   selector: 'app-user-order',
//   templateUrl: './user-order.component.html',
//   styleUrls: ['./user-order.component.css']
// })
// export class UserOrderComponent implements OnInit {
//   constructor() { }

//   displayedColumns = ['position', 'product', 'value'];
//   // dataSource = PRODUCTS;
//   dataSource = new MatTableDataSource<UserOrderProducts>(PRODUCTS);
//   ngOnInit() {
//   }

//   getRecord = (row)=>{
//     console.log(row)
//   } 

//   /** Gets the total cost of all transactions. */
//   getTotalCost() {
//     return PRODUCTS.map(t => t.value).reduce((acc, value) => acc + value, 0);
//   }
// }

// export interface UserOrderProducts {
//   position: number;
//   product: string;
//   value: number;
// }

// const PRODUCTS: UserOrderProducts[] = [
//   {position: 1, product: 'SoftX', value: 10},
//   {position: 2, product: 'SoftY', value: 12},
//   {position: 3, product: 'SoftZ', value: 6},
//   {position: 4, product: 'CourseJava', value: 45},
//   {position: 5, product: 'CourseC#', value: 10},
// ];

