import { InventoryComponent } from './../inventory/inventory.component';
import { Component, OnInit, Input } from '@angular/core';
import Item from 'src/app/models/Item';
import { InventoryService } from 'src/app/services/InventoryService/inventory.service';
import State from 'src/app/models/State';
import { HistoryItemService } from 'src/app/services/HistoryItemService/history-item.service';
import HistoryItem from 'src/app/models/HistoryItem';
import User from 'src/app/models/User';
import { HttpClientXsrfModule } from '@angular/common/http';

@Component({
  selector: '[app-item-row]',
  templateUrl: './item-row.component.html',
  styleUrls: ['./item-row.component.css']
})


export class ItemRowComponent implements OnInit {

  constructor(private inventoryService: InventoryService, private inventory: InventoryComponent, private historyService: HistoryItemService) {

  }

  @Input()
  item: Item;
  editStatus: boolean = false;
  changeStatus: boolean = false;
  cancelStatus: boolean = false;

  addText: boolean = false;
  selectedState: State;
  stateList: State[];
  users: User[];
  selectedUser: String;
  editButton: String = "Edit";
  deleteButton: String = "Delete";
  inputText: string;
  displayHistoryModal: boolean = false;

  historyItem: HistoryItem[];

  styleInjection: Object;

  async ngOnInit() {
    this.stateList = await this.itemStates();
    this.users = await this.inventory.userListResult();
  }


  async deleteClick() {
    // this.deleteStatus=true;
    // if(this.deleteStatus){
    if (await this.deleteItem(this.item)) { this.inventory.items = await this.inventory.allItemsInventoryOrderedAsc(); }
    // }
    // this.inventory.items = await this.inventory.allItemsInventoryOrderedAsc();
  }

  async cancelClick() {
    this.inventory.items = await this.inventory.allItemsInventoryOrderedDesc();
  }


  async editClick() {
    this.editStatus = true;
    this.editButton = "Save"
    this.cancelStatus = true;
    let paramList = [this.selectedUser, this.inputText, this.selectedState];

    if (this.editStatus) {

      let userCompanyID: string = null;
      if (this.selectedUser) {
        userCompanyID = this.selectedUser.substring(// split and trim after user companyId
          this.selectedUser.lastIndexOf("(") + 1,
          this.selectedUser.lastIndexOf(")")
        ).replace(/\s/g, "");
        let user: User = this.users.find(i => i.companyId.match(userCompanyID))
        this.item.user = user;
      }
      if (this.inputText) {
        this.item.comment = this.inputText;
        if (this.selectedState) {
          this.item.state = this.selectedState;
        } else {
          this.item.state = this.item.state;
        }
      }
      if (this.selectedState) {
        this.item.comment = this.inputText;
        this.item.state = this.selectedState;

      }
    }
    if (this.any(paramList)) {
      await this.updateItem();
      this.inventory.items = await this.inventory.allItemsInventoryOrderedDesc();
    }
  }

  any(iterable) {
    for (var index = 0; index < iterable.length; index++) {
      if (iterable[index]) return true;
    }
    return false;
  }

  async updateItem(): Promise<Boolean> {
    let userCompanyID: string = null;
    if (this.selectedUser) {
      userCompanyID = this.selectedUser.substring(// split and trim after user companyId
        this.selectedUser.lastIndexOf("(") + 1,
        this.selectedUser.lastIndexOf(")")
      ).replace(/\s/g, "");
      let user: User = this.users.find(i => i.companyId.match(userCompanyID))
      this.item.user = user;
    }
    if (this.inputText) {
      this.item.comment = this.inputText;
    }
    if (this.selectedState) {
      this.item.state = this.selectedState;
    }

    let response = await this.inventoryService.updateItem(this.item);
    if (response["message"] == "Failed") {
      return false;
    }
    if (response["message"] == "Success") {
      return true;
    }
  }

  async addComment() {
    this.addText = true;
  }

  async deleteItem(item: Item): Promise<Item> {
    let response = await this.inventoryService.deleteItem(item.id);
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      // console.log(response["output"]);
      return response["output"];
    }
  }

  async updateItemStatus(): Promise<Item> {
    this.item.state = this.selectedState;
    let response = await this.inventoryService.updateItem(this.item);
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      // console.log(response["output"]);
      return response["output"];
    }
  }

  async updateCommentAndStatus(): Promise<Item> {
    this.item.comment = this.inputText;
    this.item.state = this.selectedState;
    let response = await this.inventoryService.updateItem(this.item);
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      // console.log(response["output"]);
      return response["output"];
    }
  }

  async itemStates(): Promise<State[]> {
    let response = await this.inventoryService.getItemStates();
    // console.log(response)
    if (response["message"] == "Failed") {
      return;
    }
    if (response["message"] == "Success") {
      // console.log(response["output"]);
      return response["output"];
    }
  }

  async itemHistory(itemId: number): Promise<HistoryItem[]> {
    let response = await this.historyService.fetchItemHistory(itemId);
    // console.log(response)
    if (response["message"] != "Success") {
      console.log("Err");
      return;
    }
    if (response["message"] == "Success") {
      // console.log(response["output"]);
      return response["output"];
    }
  }

  async onClickShowHistory(itemId: number) {
    let findItemHistory: number = itemId;
    // console.log(`<item> clicked: true ${findItemHistory}`);
    this.historyItem = await this.itemHistory(findItemHistory);
    // console.log(response);
    if (this.historyItem) {
      // console.log(this.historyItem);
      this.displayHistoryModal = true;
    } else {
      return
    }
  }

  mouseCoordinates(event, commentText) {
    if (commentText) {
      if (commentText.length >= 9) {
        // console.log(event.clientX, event.clientY);
        this.styleInjection = { 'left': `${event.clientX}px`, 'top': `${event.clientY}px` };
      }
    } else {
      return
    }
  }

  commentContainerLocation(): Object {

    return this.styleInjection;

  }

}

