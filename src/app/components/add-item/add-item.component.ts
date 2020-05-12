import { Component, OnInit } from '@angular/core';
import { AddItemService } from '../../services/AddItemService/add-item.service'
import Item from 'src/app/models/Item';
import ItemType from 'src/app/models/ItemType';
import State from 'src/app/models/State';
import User from 'src/app/models/User';
import { InventoryComponent } from '../inventory/inventory.component'
import Room from 'src/app/models/Room';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  //filled lists with the services response
  itemTypes: ItemType[];
  producers: any[];
  models: any[];
  stateList: State[];
  users: User[];
  rooms: Room[];
  //binding fields
  selectedItemType: string = null;
  selectedProducer: string = null;
  selectedModel: string = null;
  selectedInventoryNumber: number = null;
  selectedComment: string = null;
  selectedUser: string = null;
  selectedState: string = null;
  selectedSerialId: string = null;
  selectedRoom: string = null;

  errorDisplay: string = 'none';

  checkedItemType: string;
  checkedInventoryNumber: number;
  checkedState: string;
  checkedUser: string;

  errorItemType: Object = null;
  errorInventoryNumber: Object = null;
  errorState: Object = null;
  errorUser: Object = null;

  validInventoryNumber: Boolean = true;

  constructor(private addItemService: AddItemService, private inventory: InventoryComponent) { }

  async ngOnInit() {
    this.itemTypes = await this.itemTypesList();
    this.models = await this.modelList();
    this.producers = await this.producerList();
    this.stateList = await this.statusList();
    this.users = await this.inventory.userListResult();
    this.rooms = await this.roomList();

  }

  closeAddItem() {
    this.inventory.display = false;
    this.resetFields();
  }

  async insertItemType() {
    console.log(this.selectedItemType)
    if (this.itemTypes) {
      if (this.itemTypes.find(i => i.type.match(this.selectedItemType))) {
        return "Exists";
      } else {
        let itemType = { type: this.selectedItemType }
        return await this.addItemService.insertItemType(itemType);
      }
    }
  }

  async addItem() {

    let response = this.checkFields(this.selectedItemType, this.selectedInventoryNumber, this.selectedState, this.selectedUser);
    console.log(response);
    if (!response) {
      this.openErrorMsg();
      setTimeout(() => {
        this.closeErrorMsg();
      }, 3000);
      return
    }

    let insertResponse = await this.insertItemType();
    console.log(insertResponse);
    let addResponse;
    if (insertResponse["message"] === "Success" || insertResponse === "Exists") {
      if (insertResponse["message"] === "Success") {
        this.itemTypes = await this.itemTypesList();
        console.log(this.itemTypes);
      }
      let item = this.prepareItem();
      addResponse = await this.addItemService.addItem(item);
    }
    this.models = await this.modelList();
    this.producers = await this.producerList();
    return addResponse;

  }

  prepareItem() {

    let userCompanyID: string = null;
    if (this.selectedUser) {
      userCompanyID = this.selectedUser.substring(// split and trim after user companyId
        this.selectedUser.lastIndexOf("(") + 1,
        this.selectedUser.lastIndexOf(")")
      ).replace(/\s/g, "");
    }

    let item: Item = {
      id: null,
      itemType: this.itemTypes.find(i => i.type.toLocaleLowerCase().match(this.selectedItemType.toLocaleLowerCase())),
      producer: this.selectedProducer,
      model: this.selectedModel,
      inventoryNumber: this.selectedInventoryNumber,
      comment: this.selectedComment,
      user: this.users.find(i => i.companyId.match(userCompanyID)),
      room: this.rooms.find(i => i.name.match(this.selectedRoom)),
      serialId: this.selectedSerialId,
      state: this.stateList.find(i => i.type.match(this.selectedState)),
      itemStatus: null
    }
    return item
  }

  checkFields(reqItemType: string, reqInventoryNumber: number, reqState: string, reqUser: string): Boolean {

    this.checkedItemType = reqItemType;
    this.checkedInventoryNumber = reqInventoryNumber;
    this.checkedState = reqState;
    this.checkedUser = reqUser;
    let borderStyle = 'double';
    let borderColor = 'red';
    if (!this.checkedItemType) {
      this.errorItemType = { 'border-style': borderStyle, 'border-color': borderColor };
    } else {
      this.errorItemType = null;
    }

    if (!this.checkedInventoryNumber) {
      this.errorInventoryNumber = { 'border-style': borderStyle, 'border-color': borderColor };
    } else {
      this.errorInventoryNumber = null;
    }

    if (!this.checkedState) {
      this.errorState = { 'border-style': borderStyle, 'border-color': borderColor };
    } else {
      this.errorState = null;
    }

    if (!this.checkedUser) {
      this.errorUser = { 'border-style': borderStyle, 'border-color': borderColor };
    } else {
      this.errorUser = null;
    }

    let reqFields = [this.checkedItemType, this.checkedInventoryNumber, this.checkedState, this.checkedUser, this.validInventoryNumber];

    if (!this.all(reqFields)) {
      return false;
    }
    else {
      return true
    }
  }

  all(iterable) {
    for (var index = 0; index < iterable.length; index++) {
      if (!iterable[index]) return false;
    }
    return true;
  }
  async onClickAddItem() {

    let response = await this.addItem();//TODO finish in backend to deliver record added
    if (response["message"] == "Success") {
      setTimeout(() => {
        this.closeAddItem();
        this.resetFields();//reset fields with the values from the last session 
      }, 1000);
      this.inventory.items = await this.inventory.allItemsInventoryOrderedDesc();
    }
    if (response["message"] == "Error") {
      console.log("ERROR inserting item");
    }
  }

  async itemTypesList(): Promise<ItemType[]> {
    let response = await this.addItemService.fetchItemTypesList();
    // console.log(response);
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      // console.log(response["output"]);
      return response["output"];
    }
  }

  async producerList(): Promise<any[]> {
    let response = await this.addItemService.fetchProducerList();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      // console.log(response["output"]);
      return response["output"];
    }
  }

  async modelList(): Promise<any[]> {
    let response = await this.addItemService.fetchModelList();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      // console.log(response["output"]);
      return response["output"];
    }
  }

  async statusList(): Promise<State[]> {
    let response = await this.addItemService.fetchStatusList();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      // console.log(response["output"]);
      return response["output"];
    }
  }

  async roomList(): Promise<Room[]> {
    let response = await this.addItemService.fetchRoomList();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      // console.log(response["output"]);
      return response["output"];
    }
  }

  onKeyupValidateInvNr() {
    setTimeout(() => {
      this.validateInventNr();
    }, 1000);
  }

  async validateInventNr() {
    let borderStyle = 'double';
    let borderColor = 'red';

    let response = await this.checkInventoryNumber();
    // console.log(response);

    if (response) {
      this.errorInventoryNumber = { 'border-style': borderStyle, 'border-color': borderColor };
      this.validInventoryNumber = false;
    } else {
      this.errorInventoryNumber = null;
      this.validInventoryNumber = true;
    }
  }

  async checkInventoryNumber() {

    if (this.selectedInventoryNumber >= 3) {
      let inventoryNumberslist: number[] = await this.inventory.existingInventoryNumbers();
      if (inventoryNumberslist) {
        if (inventoryNumberslist.find(x => x == this.selectedInventoryNumber)) {
          return true
        } else {
          return false
        }
      }
    }
  }

  openErrorMsg() {
    this.errorDisplay = 'block';
  }

  closeErrorMsg() {
    this.errorDisplay = 'none';
  }

  resetFields() {//reset fields from texts and errors 
    this.selectedItemType = null;
    this.selectedProducer = null;
    this.selectedModel = null;
    this.selectedInventoryNumber = null;
    this.selectedComment = null;
    this.selectedUser = null;
    this.selectedState = null;
    this.selectedSerialId = null;
    this.selectedRoom = null;
    this.closeErrorMsg();
    this.errorItemType = null;
    this.errorInventoryNumber = null;
    this.errorState = null;
    this.errorUser = null;
    this.validInventoryNumber = true;
  }

  errorStyle(): Object {//TODO: i can bind this to ngStyle , but i must find a way to add it only when null value has been sent for mandatory field
    let borderStyle = 'double';
    let borderColor = 'red';
    return { 'border-style': borderStyle, 'border-color': borderColor }
  }

}
