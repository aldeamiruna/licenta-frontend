import {Component} from '@angular/core';
import { OrdersService } from 'src/app/services/orders';
import { first } from 'rxjs/operators';
import { OrdersComponent } from '../orders/orders.component';

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
  order;
  constructor(private ordersService:OrdersService){}


   ngOnInit(){
    const recordClicked = this.ordersService.recordClicked;
    this.ordersService.getUserOrder(recordClicked.id).pipe(first())
    .subscribe(
        response => {
            this.order = response;
        },
        error => {
            console.log("error in fetching the order")
        });
  }

  displayedColumns: string[] = ['position', 'product', 'details', 'value'];
  products: UserOrderProducts[] = [
      {position: 1, product: 'SoftX', value: 10},
      {position: 2, product: 'SoftY', value: 12},
      {position: 3, product: 'SoftZ', value: 6},
      {position: 4, product: 'CourseJava', value: 45},
      {position: 5, product: 'CourseC#', value: 10},
    ];

  /** Gets the total cost of all transactions. */
  getTotalCost() {
    if(this.order){
      return this.order.map(t => t.value).reduce((acc, valuep) => acc + valuep, 0);
    }
  }
}
