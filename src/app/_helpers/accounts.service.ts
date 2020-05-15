import { Injectable } from '@angular/core';
import { Role, UserAccount } from '../models';


@Injectable({ providedIn: 'root' })
export class AccountsService {
    private userAccounts: UserAccount[];
    constructor(){
        this.userAccounts = [
            { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
            { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
        ];
    }
    
    get getUserAccounts() {
        return this.userAccounts;
    }

    set setUserAccounts(userAccount:UserAccount) {
        this.userAccounts.push(userAccount);
    }
}