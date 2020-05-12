import { InventoryComponent } from './../inventory/inventory.component';
import { Component, OnInit, Input } from '@angular/core';
import Room from 'src/app/models/Room';
import { RoomComponent } from '../room/room.component';
import Item from 'src/app/models/Item';
import { RoomService } from 'src/app/services/RoomService/room.service';

@Component({
  selector: '[app-room-row]',
  templateUrl: './room-row.component.html',
  styleUrls: ['./room-row.component.css']
})
export class RoomRowComponent implements OnInit {

  constructor(private roomService: RoomService, private roomComponent: RoomComponent) { }

  @Input()
  room: Room;
  
  showMore: boolean = false;
  showButton: String = "Details";
  cancelStatus: boolean = false;

  inputLastName: string;
  inputEmail: string;

  items: Item[];

  async ngOnInit() {
    //this.inputText = await this.getInputText();
    this.items = await this.itemList(this.room);
  }

//   async cancelClick() {
//     this.userComponent.users = await this.userComponent.allUsers();
//   }

//   async editClick() {
//     this.editUser = true;
//     this.editButton = "Save";
//     this.cancelStatus = true;

//     if (!this.selectedStatus) {
//       return;
//     }

//     if (this.editUser) {
//       this.user.status = this.selectedStatus;

//       this.user = await this.updateUserStatus();

//       this.userComponent.users = await this.userComponent.allUsers();
//     }
//   }
async showDetails(){

    this.showMore = true;
}

async itemList(room: Room): Promise<Item[]> {
  let response = await this.roomService.fetchItemList(room);
  if (response["message"] != "Success") {
    console.log("Err");
    return;
  }
  if (response["message"] == "Success") {
    return response["output"];
  }
}

}
