import { Component, OnInit } from '@angular/core';
import Item from 'src/app/models/Item';
import { BuyoutService } from 'src/app/services/BuyoutService/buyout.service';

@Component({
  selector: 'app-buyout',
  templateUrl: './buyout.component.html',
  styleUrls: ['./buyout.component.css']
})
export class BuyoutComponent implements OnInit {

  items: Item[];
  constructor(private buyoutService : BuyoutService) { }

  async ngOnInit() {
    this.items = await this.buyoutItems();
    console.log(this.items);
  }

  async buyoutItems(): Promise<Item[]> {
    let response = await this.buyoutService.fetchBuyoutItems();
    console.log(response)
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      return response["output"];
    }
  }
}
