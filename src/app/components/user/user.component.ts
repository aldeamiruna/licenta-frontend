import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import { UserService } from '../../services/UserService/user.service'
import UserStatus from 'src/app/models/UserStatus';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  //filled lists with the services response
  companyIdList: string[];
  statusList: UserStatus[];
  users: User[];

  //fields 
  user: User;
  selectedStatus: UserStatus;
  display: boolean = false;

  constructor(private userService: UserService) { }

  async ngOnInit() {
   
    this.users = await this.allUsers();
    this.statusList = await this.populateStatusList();
  }

  async allUsers(): Promise<User[]> {
    let response = await this.userService.fetchUsers();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      return response["output"].reverse();
    }
  }
  async populateStatusList(): Promise<UserStatus[]> {
    let response = await this.userService.populateUserStates();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      return response["output"];
    }
  }

  openAddUser() {
    this.display = true;
  }


  async filterUserByStatus(): Promise<User[]> {
    let dict: User = {
      "id": null,
      "companyId": null,
      "firstName": null,
      "lastName": null,
      "email": null,
      "status": this.selectedStatus
    }
    let response = await this.userService.filterUserByStatus(dict);
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      // console.log(response["output"]);
      return response["output"];
    }
  }

  async filterUsers() {
    this.users = await this.filterUserByStatus();
  }
}
