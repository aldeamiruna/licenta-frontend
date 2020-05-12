import { Component, OnInit } from '@angular/core';
import { InventoryService } from './services/InventoryService/inventory.service';
import Item from 'src/app/models/Item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  dashboardLinkActive: boolean = false;
  inventoryLinkActive: boolean = false;
  categoryLinkActive: boolean = false;
  usersLinkActive: boolean = false;
  buyoutLinkActive: boolean = false;
  roomLinkActive:boolean = false;

  displayDoc: boolean = false;

  constructor() { }

  ngOnInit(): void {

    if (window.location.pathname == "/dashboard") {

      this.dashboardLinkActive = true;

    } else if (window.location.pathname == "/inventory") {

      this.inventoryLinkActive = true;

    } else if (window.location.pathname == "/category") {

      this.usersLinkActive = true;

    } else if (window.location.pathname == "/user") {

      this.usersLinkActive = true;
    }
    else if (window.location.pathname == "/buyout") {
      this.buyoutLinkActive = true;
    }
    else if (window.location.pathname == "/room") {
      this.roomLinkActive = true;
    }



  }

  activeImgLink() {//TODO: function happens to quickly and window.location.pathname doesn't have time to process the correct path
    console.log(window.location.pathname);
    setTimeout(() => {
      if (window.location.pathname == "/dashboard") {
        this.dashboardLinkActive = true;
      } else {
        this.dashboardLinkActive = false;
      }
      if (window.location.pathname == "/inventory") {
        this.inventoryLinkActive = true;
      } else {
        this.inventoryLinkActive = false;
      }
      if (window.location.pathname == "/category") {
        this.categoryLinkActive = true;
      } else {
        this.categoryLinkActive = false;
      }
      if (window.location.pathname == "/user") {
        this.usersLinkActive = true;
      } else {
        this.usersLinkActive = false;
      }
     if (window.location.pathname == "/buyout") {
      this.buyoutLinkActive = true;
      } else {
      this.buyoutLinkActive = false;
      }
      if (window.location.pathname == "/room") {
        this.roomLinkActive = true;
        } else {
        this.roomLinkActive = false;
        }
    }, 500);
  }

  onClickActiveDashboard() {
    this.dashboardLinkActive = true;
    this.inventoryLinkActive = false;
    this.categoryLinkActive = false;
    this.usersLinkActive = false;
    this.buyoutLinkActive = false;
    this.roomLinkActive= false;
  }

  onClickActiveInventory() {
    this.dashboardLinkActive = false;
    this.inventoryLinkActive = true;
    this.categoryLinkActive = false;
    this.usersLinkActive = false;
    this.buyoutLinkActive = false;
    this.roomLinkActive= false;

  }
  onClickActiveCategory() {
    this.dashboardLinkActive = false;
    this.inventoryLinkActive = false;
    this.categoryLinkActive = true;
    this.usersLinkActive = false;
    this.buyoutLinkActive = false;
    this.roomLinkActive= true;
  }

  onClickActiveUsers() {
    this.dashboardLinkActive = false;
    this.inventoryLinkActive = false;
    this.categoryLinkActive = false;
    this.usersLinkActive = true;
    this.buyoutLinkActive = false;
    this.roomLinkActive= false;

  }
  onClickActiveBuyout() {
    this.dashboardLinkActive = false;
    this.inventoryLinkActive = false;
    this.categoryLinkActive = false;
    this.usersLinkActive = false;
    this.buyoutLinkActive = true;
    this.roomLinkActive= false;
  }
  onClickActiveRoom() {
    this.dashboardLinkActive = false;
    this.inventoryLinkActive = false;
    this.categoryLinkActive = false;
    this.usersLinkActive = false;
    this.buyoutLinkActive = false;
    this.roomLinkActive= true;
  }
  showDocView(){
    this.displayDoc = true;
  }

  closeDocView() {
    this.displayDoc = false;
  }

}