import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';
import { AccountService } from '../services/account.service';

@Component({templateUrl: './listEmployeeQuitted.component.html',  selector: 'listEmployeeQuitted'})
export class ListEmployeeQuittedComponent implements OnInit {

    // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    users = null;
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

    constructor(private accountService: AccountService) {}

    ngOnInit() {
    }
}