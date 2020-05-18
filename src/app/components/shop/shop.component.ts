import { Component, OnInit } from '@angular/core';
import { ShopProductsService } from 'src/app/services/shop-products';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  shopProducts;
  constructor(private shopProductsService: ShopProductsService) { }

  ngOnInit() {
    this.shopProducts=this.shopProductsService.coursesProducts;
    console.log(this.shopProducts);
  }

}
