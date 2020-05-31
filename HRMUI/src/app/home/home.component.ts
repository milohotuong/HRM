import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({ templateUrl: './home.component.html' , 
selector : 'home',
providers: [Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]})
export class HomeComponent implements OnInit {
    router: Router;
    user: User;
    location: Location;
      constructor(private accountService: AccountService, location: Location) {
        this.location = location;
    }
   ngOnInit() {
     console.log(this.location.path().toString);
    }
}