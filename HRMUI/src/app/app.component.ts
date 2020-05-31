import { Component } from '@angular/core';
import {User} from './models/user';
import { AccountService } from '../app/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   user: User;

    constructor(private accountService: AccountService) {
        this.accountService.user.subscribe(x => this.user = x);
    }

    logout() {
        this.accountService.logout();
    }

    add(){
        this.accountService.add('abc12345hahaaha','bbbbb', 1)
            .subscribe(
                data => {
                   console.log ('hahaha');
                },
                error => {
                   console.log ('huhuhu');
                });
    }
}
