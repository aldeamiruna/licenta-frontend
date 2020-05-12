import { Component, OnInit } from '@angular/core';
import { ItemRowComponent } from '../item-row/item-row.component';
import Item from 'src/app/models/Item';
import { RoomRowComponent } from '../room-row/room-row.component';
import Room from 'src/app/models/Room';


@Component({
  selector: 'app-room-details',
  templateUrl: './details-room.component.html',
  styleUrls: ['./details-room.component.css']
})
export class DetailsRoomComponent implements OnInit {
  room: Room;
  items: Item[];
  styleInjection: Object;
  commentText: string;

  constructor(private roomRow: RoomRowComponent) {
  }


 async ngOnInit() {
    this.room = await this.roomRow.room;
    this.items = await this.roomRow.items;
  }

  async closeDetailsModal() {
    this.roomRow.showMore = false;
  }
}
