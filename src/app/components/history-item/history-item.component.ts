import { Component, OnInit } from '@angular/core';
import { ItemRowComponent } from '../item-row/item-row.component';
import Item from 'src/app/models/Item';
import HistoryItem from 'src/app/models/HistoryItem';


@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.css']
})
export class HistoryItemComponent implements OnInit {
  item: Item;
  history: HistoryItem[];
  styleInjection: Object;
  commentText: string;

  constructor(private itemRow: ItemRowComponent) {
  }


  ngOnInit() {
    this.history = this.itemRow.historyItem;
    this.item = this.itemRow.item;
  }

  async closeHistory() {
    this.itemRow.displayHistoryModal = false;
  }
}
