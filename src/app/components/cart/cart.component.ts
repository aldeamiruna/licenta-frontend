import { Component, OnInit } from '@angular/core';
import { CartService, DbProduct, DbUserOrder } from 'src/app/services/cart';
import { Product } from 'src/app/services/shop-products';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/services/UserService';
import { map, first } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart;
  dataSource;
  selection;
  error = '';
  loading = false;

  constructor(private cartService: CartService, private appComp:AppComponent, private authentication: AuthenticationService) { }

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
    console.log("cart==>",this.cart)
    if(this.cart===undefined || this.cart.length==0){
      return;
    }
    if(!this.appComp.userLogged){
      this.appComp.loginModal=true;
      return
    }
    if(this.appComp.userLogged){
      let user;
      this.authentication.currentUser.pipe(first())
      .subscribe(
          response => {
              user = response;
          },
          error => {
              console.log("error in fetching the user")
          });
      let userProducts = this.cart.map(product => {
        let dbProduct = new DbProduct();
        dbProduct.product = product.title;
        dbProduct.details = product.subtitle;
        dbProduct.value = product.value;
        return dbProduct;
      });
      let userOrder = new DbUserOrder();
      userOrder.username = user.username;
      userProducts.forEach(userProduct => userOrder.orderProducts.push(userProduct));
      this.cartService.saveOrder(userOrder).pipe(first())
      .subscribe(
          response => {
            //on success, flushing the data saved in variables to reset the user cart
            this.cart = [];
            this.cartService.cart=[];
            this.dataSource = new MatTableDataSource<Product>(this.cart);
          },
          error => {
            this.error = "Error while sending your order, please try again :)";
            this.loading = false;
          });
      
      return;
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
