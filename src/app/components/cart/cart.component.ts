import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart';
import { Product } from 'src/app/services/shop-products';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart;
  dataSource;
  selection;
  constructor(private cartService: CartService, private appComp:AppComponent) { }

  ngOnInit() {
    this.cart = this.cartService.cart;
    this.dataSource = new MatTableDataSource<Product>(this.cartService.cart);
    this.selection = new SelectionModel(true, []);
  }
  displayedColumns: string[] = ['select', 'position', 'title', 'subtitle', 'value'];
  
  getTotalCost() {
    if(this.cart){
      return this.cart.map(t => t.value).reduce((acc, valuep) => acc + valuep, 0);
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  submitOrder(){//TODO: send the cart items to backend if user is logged
    console.log(this.cart)
    console.log(this.appComp.userLogged)
    if(this.cart===undefined || this.cart.length==0){
      // console.log(this.cart)
      return;
    }
    
    if(!this.appComp.userLogged){
      this.appComp.loginModal=true;
    }

  }
  removeSelectedRows() {
    if(!this.cart){
      return;
    }
    this.selection.selected.forEach(item => {
       let index: number = this.cart.findIndex(d => d === item);
       this.cart.splice(index,1)
       this.dataSource = new MatTableDataSource<Product>(this.cart);
     });
     this.selection = new SelectionModel(true, []);
  }
}
