import { Component, OnInit } from '@angular/core';
import { ShopProductsService } from 'src/app/services/shop-products';
import { CartService } from 'src/app/services/cart';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  shopProducts;
  constructor(private shopProductsService: ShopProductsService,private cartService: CartService) { }

  ngOnInit() {
    this.shopProducts=this.shopProductsService.coursesProducts;
  }

  addToCart(product){
    this.cartService.cart.push(product);
  }
}
