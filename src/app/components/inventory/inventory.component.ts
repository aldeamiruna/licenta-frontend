import { Component, OnInit } from '@angular/core';
import Item from 'src/app/models/Item';
import ItemType from 'src/app/models/ItemType';
import State from 'src/app/models/State';
import { InventoryService } from 'src/app/services/InventoryService/inventory.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import User from 'src/app/models/User';
import Room from 'src/app/models/Room';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})

export class InventoryComponent implements OnInit {

  items: Item[];
  selectedItem: Item;
  typeList: ItemType[];
  selectedType: string;
  stateList: State[];
  selectedState: string;
  producerList: string[];
  selectedProducer: string;
  modelList: String[];
  users: User[];
  selectedModel: string;
  inventoryNumberList: number[];
  selectedInventoryNumber: number;
  selectedSerialID: string;
  serialIdList: string[];
  selectedUser: string;
  userList: User[];
  selectedRoom: string;
  roomList: Room[];
  jsonItem: string;
  selectedStateType: string;
  switcher: boolean = false;
  display: boolean = false;
  filter: boolean = false;


  constructor(private inventoryService: InventoryService) { }


  async ngOnInit() {
    this.items = await this.allItemsInventoryOrderedDesc();
    this.typeList = await this.existingItemTypes();
    this.stateList = await this.existingItemStates();
    this.producerList = await this.existingProducers();
    this.modelList = await this.existingModels();
    this.inventoryNumberList = await this.existingInventoryNumbers();
    this.users = await this.userListResult();
    this.serialIdList = await this.existingSerialIds();
    this.userList = await this.existingUsers();
    this.roomList = await this.existingRooms();

  }

  openAddItem() {
    this.display = true;
  }

  async onClickOrder() {
    if (this.switcher) {
      // console.log(this.switcher);
      this.switcher = false;
      // console.log(`===>` + this.switcher);
      this.items = await this.allItemsInventoryOrderedDesc();
    } else {
      // console.log(this.switcher);
      this.switcher = true;
      // console.log(`===>` + this.switcher);
      this.items = await this.allItemsInventoryOrderedAsc();
    }
  }

  async allItemsInventoryOrderedAsc(): Promise<Item[]> {
    let response = await this.inventoryService.fetchInventoryOrderedAsc();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      // console.log(response["output"]);
      return response["output"];
    }
  }

  async allItemsInventoryOrderedDesc(): Promise<Item[]> {
    let response = await this.inventoryService.fetchInventoryOrderedDesc();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      return response["output"];
    }
  }

  async handleClick() {
    if (this.filter) {
      this.items = await this.allItemsInventoryOrderedDesc();
      this.filter = false;
    } else {
      this.filter = true;
      this.items = await this.filterByStatus();
    }
  }

  async filterByStatus(): Promise<Item[]> {
    let response = await this.inventoryService.filterItemsByStatus();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      return response["output"];
    }
  }

  async existingItemStates(): Promise<State[]> {
    let response = await this.inventoryService.getExistingItemStates();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      return response["output"];
    }
  }


  async existingItemTypes(): Promise<ItemType[]> {
    let response = await this.inventoryService.populateItemTypes();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      // console.log(response["output"]);
      return response["output"];
    }
  }

  async existingProducers(): Promise<string[]> {
    let response = await this.inventoryService.getExistingProducers();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      return response["output"];
    }
  }

  async existingModels(): Promise<string[]> {
    let response = await this.inventoryService.getExistingModels();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      return response["output"];
    }
  }

  async existingInventoryNumbers(): Promise<number[]> {
    let response = await this.inventoryService.getExistingInventoryNumbers();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      return response["output"];
    }
  }

  async existingSerialIds(): Promise<string[]> {
    let response = await this.inventoryService.getExistingSerialIds();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      return response["output"];
    }
  }

  async existingUsers(): Promise<User[]> {
    let response = await this.inventoryService.populateUsers();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      return response["output"];
    }
  }

  async existingRooms(): Promise<Room[]> {
    let response = await this.inventoryService.populateRooms();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      return response["output"];
    }
  }

  getBySelectedInventoryNumber() {
    return this.selectedInventoryNumber;
  }

  async customFilter(): Promise<Item[]> {
    let user = null;
    let itemType: ItemType = null;
    let room: Room = null;
    let state = null;
    let userCompanyID: string = null;

    if (this.selectedUser) {
      userCompanyID = this.selectedUser.substring(
        this.selectedUser.lastIndexOf("(") + 1,
        this.selectedUser.lastIndexOf(")")
      ).replace(/\s/g, "");
      user = this.userList.find(u => u.companyId.toLocaleUpperCase().match(this.selectedUser.toLocaleUpperCase()));
    }
    if (this.selectedType) {
      itemType = this.typeList.find(t => t.type.toLocaleLowerCase().match(this.selectedType.toLocaleLowerCase()));
    }
    if (this.selectedRoom) {
      room = this.roomList.find(r => r.name.toLocaleUpperCase().match(this.selectedRoom.toLocaleUpperCase()));
    }
    if (this.selectedState) {
      state = this.stateList.find(s => s.type.toLocaleLowerCase().match(this.selectedState.toLocaleLowerCase()));
    }

    let dict: Item = {
      "id": null,
      "comment": null,
      "inventoryNumber": this.selectedInventoryNumber,
      "model": this.selectedModel,
      "producer": this.selectedProducer,
      "serialId": this.selectedSerialID,
      "itemStatus": null,
      "room": room,
      "state": state,
      "user": user,
      "itemType": itemType
    }
    let response = await this.inventoryService.customFilter(dict);
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      return response["output"].reverse();
    }
  }

  async filterItem() {
    this.items = await this.customFilter();
  }

  emptyFilters() {
    this.selectedType = null;
    this.selectedProducer = null;
    this.selectedModel = null;
    this.selectedInventoryNumber = null;
    this.selectedRoom = null;
    this.selectedUser = null;
    this.selectedState = null;
  }

  async resetFilters() {
    this.emptyFilters();
    this.items = await this.allItemsInventoryOrderedDesc();
  }



  async userListResult(): Promise<User[]> {
    let response = await this.inventoryService.fetchUserList();
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      // console.log(response["output"]);
      return response["output"];
    }
  }
}



