import { InventoryComponent } from './../inventory/inventory.component';
import { Component, OnInit, Input } from '@angular/core';
import User from 'src/app/models/User';
import { InventoryService } from 'src/app/services/InventoryService/inventory.service';
import { UserService } from 'src/app/services/UserService/user.service';
import UserStatus from 'src/app/models/UserStatus';
import { UserComponent } from '../user/user.component';

@Component({
  selector: '[app-user-row]',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.css']
})
export class UserRowComponent implements OnInit {

  constructor(private userService: UserService, private userComponent: UserComponent) { }

  @Input()
  user: User;
  
  editUser: boolean = false;
  selectedStatus: UserStatus;
  stateList: UserStatus[];
  editButton: String = "Edit";
  cancelStatus: boolean = false;

  inputLastName: string;
  inputEmail: string;

  async ngOnInit() {
    this.stateList = await this.existingUserStates();
    //this.inputText = await this.getInputText();
  }

  async cancelClick() {
    this.userComponent.users = await this.userComponent.allUsers();
  }

  async editClick() {
    this.editUser = true;
    this.editButton = "Save";
    this.cancelStatus = true;

    if (!this.selectedStatus) {
      return;
    }

    if (this.editUser) {
      this.user.status = this.selectedStatus;

      this.user = await this.updateUserStatus();

      this.userComponent.users = await this.userComponent.allUsers();
    }
  }

  async existingUserStates(): Promise<UserStatus[]> {
    let response = await this.userService.populateUserStates();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      // console.log(response["output"]);
      return response["output"];
    }
  }
  async updateUserStatus(): Promise<User> {
    this.user.status = this.selectedStatus;
    let response = await this.userService.updateStatusUser(this.user);
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      return response["output"];
    }
  }
}
