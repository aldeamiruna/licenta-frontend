import { Component, OnInit } from '@angular/core';
import Room from 'src/app/models/Room';
import { RoomService } from 'src/app/services/RoomService/room.service';

@Component({
  selector: 'app-user',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  //filled lists with the services response
  companyIdList: string[];
//   statusList: UserStatus[];
  rooms: Room[];

  //fields 
  room: Room;
//   selectedStatus: UserStatus;
  display: boolean = false;

  constructor(private roomService: RoomService) { }

  async ngOnInit() {
   
    this.rooms = await this.allRooms();
    // this.statusList = await this.populateStatusList();
  }

//   async populateStatusList(): Promise<UserStatus[]> {
//     let response = await this.userService.populateUserStates();
//     if (response["message"] == "Failed") {
//       return;
//     }
//     if (response["message"] == "Success") {
//       return response["output"];
//     }
//   }

//   openAddUser() {
//     this.display = true;
//   }


//   async filterUserByStatus(): Promise<User[]> {
//     let dict: User = {
//       "id": null,
//       "companyId": null,
//       "firstName": null,
//       "lastName": null,
//       "email": null,
//       "status": this.selectedStatus
//     }
//     let response = await this.userService.filterUserByStatus(dict);
//     if (response["message"] == "Failed") {
//       return;
//     }
//     if (response["message"] == "Success") {
//       // console.log(response["output"]);
//       return response["output"];
//     }
//   }

//   async filterUsers() {
//     this.users = await this.filterUserByStatus();
//   }
async allRooms(): Promise<Room[]> {
    let response = await this.roomService.fetchRooms();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {

      return response["output"].reverse();
    }
  }
}
