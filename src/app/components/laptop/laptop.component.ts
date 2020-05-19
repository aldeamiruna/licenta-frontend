import { Component, OnInit } from '@angular/core';
import { ShopProductsService } from 'src/app/services/shop-products';
import { CartService } from 'src/app/services/cart';

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css']
})
export class LaptopComponent implements OnInit {
  shopProducts;
  constructor(private shopProductsService: ShopProductsService,private cartService: CartService) { }

  ngOnInit() {
    this.shopProducts=this.shopProductsService.laptopProducts;
  }

  addToCart(product){
    this.cartService.cart.push(product);
  }
}
