import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';

import { AccountService } from '../services/account.service';
import { EmployeeDetail } from '../models/employeeDetail';

@Component({ templateUrl: './employeeDetail.component.html', selector: 'employeeDetailComponent' })
export class employeeDetailComponent implements OnInit {
    // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    users = null;
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    tabIndex: number;

    constructor(private accountService: AccountService) { }

    @Input()
    employeeDetail: EmployeeDetail;

    ngOnInit() {
        this.tabIndex = 1;
        console.log("ahihihi" + this.employeeDetail.email);
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;

    }

    changeTab(tabIndex: number) {
        console.log("vào cho bố");
        this.tabIndex = tabIndex;
    }
}