import { Component, OnInit } from '@angular/core';
import { ShopProductsService } from 'src/app/services/shop-products';
import { CartService } from 'src/app/services/cart';

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {
  shopProducts;
  constructor(private shopProductsService: ShopProductsService,private cartService: CartService) { }

  ngOnInit() {
    this.shopProducts=this.shopProductsService.softwareProducts;
  }

  addToCart(product){
    this.cartService.cart.push(product);
  }
}
