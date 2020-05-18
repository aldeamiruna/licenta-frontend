import { Component, OnInit } from '@angular/core';
import { InventoryService } from './services/InventoryService/inventory.service';
import Item from 'src/app/models/Item';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/UserService/authentication.service';
import { UserAccount, Role } from './models';

@Component({
  selector: 'app',
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

  loginModal: boolean = false;
  registerModal:boolean =false;
  userLogged: boolean = false;
  currentUser: UserAccount;
  showMessage: boolean;
  successMessage:string;

  constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    get isAdmin() {
        return this.currentUser && this.currentUser.role === Role.Admin;
    }

    openCart(){
      this.router.navigate(['/cart']);
    }

    showLoginModal(){
        this.loginModal=true;
    }

    closeLoginModal(){
        this.loginModal=false;
    }

    logout() {
        this.authenticationService.logout();
        this.userLogged=false;
        this.router.navigate(['/shop']);
    }

    showRegisterModal(){
      this.registerModal=true;
    }

    closeRegisterModal(){
      this.registerModal=false;
    }

    showSuccessMessage() {
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 3000)
      
    }

  ngOnInit(): void {
    this.userLogged = this.currentUser?true:false;
  }

  showDocView(){
    this.displayDoc = true;
  }

  closeDocView() {
    this.displayDoc = false;
  }

}