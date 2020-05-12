import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import UserStatus from 'src/app/models/UserStatus';
import { AddUserService } from 'src/app/services/AddUserService/add-user.service';
import { UserComponent } from '../user/user.component';
@Component({

  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  id: string;
  companyId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: UserStatus;
  stateList: UserStatus[];
  companyIdList: string[];

  errorDisplay: string = 'none';

  //binding fields

  user: User;
  selectedCompanyId: string = null;
  selectedFirstName: string = null;
  selectedLastName: string = null;
  selectedEmail: string = null;
  selectedStatus: string = null;

  //for required fields - all

  checkedCompanyId: string;
  checkedFirstName: string;
  checkedLastName: string;
  checkedEmail: string;
  checkedStatus: string;

  errorCompanyID: Object = null;
  errorFirstName: Object = null;
  errorLastName: Object = null;
  errorEmail: Object = null;
  errorStatus: Object = null;

  isDuplicate: boolean = false;

  constructor(private addUserService: AddUserService, private userComponent: UserComponent) { }

  async ngOnInit() {
    this.stateList = await this.statusList();
    this.companyIdList = await this.companyIDs();
  }

  onClickPrint() {

  }

  addUser() {
    console.log(`selectedCompanyId : ${this.selectedCompanyId}`);
    console.log(`selectedFirstName : ${this.selectedFirstName}`);
    console.log(`selectedLastName : ${this.selectedLastName}`);
    console.log(`selectedEmail : ${this.selectedEmail}`);
    console.log(`selectedStatus : ${this.selectedStatus}`);
    this.user = {
      id: null,
      companyId: this.selectedCompanyId,
      firstName: this.selectedFirstName,
      lastName: this.selectedLastName,
      email: this.selectedEmail,
      status: this.stateList.find(i => i.type.match(this.selectedStatus))
    }

    if (this.checkDuplicateCompanyId(this.selectedCompanyId)) {
      this.resetCompanyIdField();
      return;
    }
    let response = this.checkFields(this.selectedCompanyId, this.selectedFirstName, this.selectedLastName, this.selectedEmail, this.selectedStatus);
    console.log(response);
    if (!response) {
      this.openErrorMsg();
      setTimeout(() => {
        this.closeErrorMsg();
      }, 3000);
      return;
    }
    return this.addUserService.addUser(this.user);

  }

  checkDuplicateCompanyId(companyId: string): boolean {
    this.checkedCompanyId = companyId;
    if (this.companyIdList.includes(companyId)) {
      this.isDuplicate = true;
      return true;

    } else {
      this.errorCompanyID = null;
    }
    return false;
  }
  checkFields(reqCompanyId: string, reqFirstName: string, reqLastName: string, reqEmail: string, reqStatus: string): Boolean {

    this.checkedCompanyId = reqCompanyId;
    this.checkedFirstName = reqFirstName;
    this.checkedLastName = reqLastName;
    this.checkedEmail = reqEmail;
    this.checkedStatus = reqStatus;

    let borderStyle = 'double';
    let borderColor = 'red';
    if (!this.checkedCompanyId) {
      this.errorCompanyID = { 'border-style': borderStyle, 'border-color': borderColor };
    } else

      this.errorCompanyID = null;


    if (!this.checkedFirstName) {
      this.errorFirstName = { 'border-style': borderStyle, 'border-color': borderColor };
    } else {
      this.errorFirstName = null;
    }

    if (!this.checkedLastName) {
      this.errorLastName = { 'border-style': borderStyle, 'border-color': borderColor };
    } else {
      this.errorLastName = null;
    }

    if (!this.checkedEmail) {
      this.errorEmail = { 'border-style': borderStyle, 'border-color': borderColor };
    } else {
      this.errorEmail = null;
    }

    if (!this.checkedStatus) {
      this.errorStatus = { 'border-style': borderStyle, 'border-color': borderColor };
    } else {
      this.errorStatus = null;
    }

    let reqFields = [this.checkedCompanyId, this.checkedFirstName, this.checkedLastName, this.checkedEmail, this.checkedStatus];

    if (!this.all(reqFields)) {
      return false;
    }
    else {
      return true
    }
  }
  async statusList(): Promise<UserStatus[]> {
    let response = await this.addUserService.fetchStatusList();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      return response["output"];
    }
  }

  async companyIDs(): Promise<string[]> {
    let response = await this.addUserService.fetchCompanyIds();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      return response["output"];
    }
  }

  resetCompanyIdField() {
    this.selectedCompanyId = null;
    this.closeErrorMsg();
  }
  resetFields() {
    this.selectedCompanyId = null;
    this.selectedFirstName = null;
    this.selectedLastName = null;
    this.selectedEmail = null;
    this.selectedStatus = null;
    this.closeErrorMsg();
  }
  openErrorMsg() {
    this.errorDisplay = 'block';
  }

  closeErrorMsg() {
    this.errorDisplay = 'none';
  }

  errorStyle(): Object {
    let borderStyle = 'double';
    let borderColor = 'red';
    return { 'border-style': borderStyle, 'border-color': borderColor }
  }

  all(iterable) {
    for (var index = 0; index < iterable.length; index++) {
      if (!iterable[index]) return false;
    }
    return true;
  }

  async onClickAddUser() {

    let response = await this.addUser();

    if (!response) {
      this.openErrorMsg();
      setTimeout(() => {
        this.closeErrorMsg();
      }, 3000)
      return;
    }

    if (response["message"] == "Success") {
      setTimeout(() => {
        this.userComponent.display = false;
        this.resetFields();//reset fields with the values from the last session 
      }, 1000);
      this.userComponent.users = await this.userComponent.allUsers();
    }

  }

  closeAddUser() {
    this.userComponent.display = false;
  }
}
