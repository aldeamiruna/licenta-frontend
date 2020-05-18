import { Injectable } from '@angular/core';

export interface Product{
  title:string;
  subtitle:string;
  img:string;
  description:string;
  value:number
}
@Injectable({
  providedIn: 'root'
})
export class ShopProductsService {

  constructor() { }

  coursesProducts:Product[]= [{title:'Monitor',subtitle:'Dell',img:'https://s12emagst.akamaized.net/products/4455/4454838/images/res_61fb6a6314b4dea2262d4a3114c52ff1_full.jpg',description:'Monitor LED Dell, 24", Full HD, DisplayPort, HDMI, Negru, U2415',value:10},
                              {title:'Monitor',subtitle:'Lenovo',img:'https://s12emagst.akamaized.net/products/17587/17586859/images/res_87cb846fc995aee1846cef99837be405_full.jpg',description:'Monitor LED VA Lenovo 21.5", Full HD, Freesync, HDMI, Negru, L22e-20',value:25},
                              {title:'Monitor',subtitle:'Lenovo',img:'https://s12emagst.akamaized.net/products/17587/17586859/images/res_87cb846fc995aee1846cef99837be405_full.jpg',description:'Monitor LED VA Lenovo 21.5", Full HD, Freesync, HDMI, Negru, L22e-20',value:15}]

  softwareProducts:Product[]=[];
  
}
