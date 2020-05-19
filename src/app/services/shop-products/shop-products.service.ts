import { Injectable } from '@angular/core';

export interface Product{
  title:string;
  subtitle:string;
  logo:string;
  img:string;
  description:string;
  value:number
}
@Injectable({
  providedIn: 'root'
})
export class ShopProductsService {

  constructor() { }

  laptopProducts:Product[]= [{title:'Monitor',subtitle:'Dell', logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/1200px-Dell_logo_2016.svg.png',img:'https://s12emagst.akamaized.net/products/4455/4454838/images/res_61fb6a6314b4dea2262d4a3114c52ff1_full.jpg',description:'Monitor LED Dell, 24", Full HD, DisplayPort, HDMI, Negru, U2415',value:10},
                              {title:'Monitor',subtitle:'Lenovo', logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/1200px-Dell_logo_2016.svg.png',img:'https://s12emagst.akamaized.net/products/17587/17586859/images/res_87cb846fc995aee1846cef99837be405_full.jpg',description:'Monitor LED VA Lenovo 21.5", Full HD, Freesync, HDMI, Negru, L22e-20',value:25},
                              {title:'Monitor',subtitle:'Lenovo', logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/1200px-Dell_logo_2016.svg.png',img:'https://s12emagst.akamaized.net/products/17587/17586859/images/res_87cb846fc995aee1846cef99837be405_full.jpg',description:'Monitor LED VA Lenovo 21.5", Full HD, Freesync, HDMI, Negru, L22e-20',value:15}]

  coursesProducts:Product[]= [{title:'Monitor',subtitle:'Dell', logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/1200px-Dell_logo_2016.svg.png',img:'https://s12emagst.akamaized.net/products/4455/4454838/images/res_61fb6a6314b4dea2262d4a3114c52ff1_full.jpg',description:'Monitor LED Dell, 24", Full HD, DisplayPort, HDMI, Negru, U2415',value:10},
                              {title:'Monitor',subtitle:'Lenovo', logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/1200px-Dell_logo_2016.svg.png',img:'https://s12emagst.akamaized.net/products/17587/17586859/images/res_87cb846fc995aee1846cef99837be405_full.jpg',description:'Monitor LED VA Lenovo 21.5", Full HD, Freesync, HDMI, Negru, L22e-20',value:25},
                              {title:'Monitor',subtitle:'Lenovo', logo:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dell_logo_2016.svg/1200px-Dell_logo_2016.svg.png',img:'https://s12emagst.akamaized.net/products/17587/17586859/images/res_87cb846fc995aee1846cef99837be405_full.jpg',description:'Monitor LED VA Lenovo 21.5", Full HD, Freesync, HDMI, Negru, L22e-20',value:15}]

  softwareProducts:Product[]=[{title:'Java',subtitle:'Basic', logo:'',img:'https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png',description:'Monitor LED Dell, 24", Full HD, DisplayPort, HDMI, Negru, U2415',value:10},
                              {title:'Java',subtitle:'OOP', logo:'',img:'https://s12emagst.akamaized.net/products/17587/17586859/images/res_87cb846fc995aee1846cef99837be405_full.jpg',description:'Monitor LED VA Lenovo 21.5", Full HD, Freesync, HDMI, Negru, L22e-20',value:25},
                              {title:'C#',subtitle:'Lenovo', logo:'',img:'https://s12emagst.akamaized.net/products/17587/17586859/images/res_87cb846fc995aee1846cef99837be405_full.jpg',description:'Monitor LED VA Lenovo 21.5", Full HD, Freesync, HDMI, Negru, L22e-20',value:15}];
  
}
