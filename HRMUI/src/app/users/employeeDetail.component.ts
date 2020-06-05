import { Component, OnInit, Input } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';

import { AccountService } from '../services/account.service';
import { EmployeeDetail } from '../models/employeeDetail';

@Component({ templateUrl: './employeeDetail.component.html', selector: 'employeeDetailComponent' })
export class EmployeeDetailComponent implements OnInit {
    // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    users = null;
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    tabIndex: number;
    isActiveAddEditEmployee: boolean;
    isLoading: boolean;
    data = null;
    constructor(private accountService: AccountService) { }

    @Input()
    employeeDetail: EmployeeDetail;

    ngOnInit() {
        this.isActiveAddEditEmployee = false;
        this.tabIndex = 1;
        this.loadData();
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;

    }

    activeAddEdit() {
        console.log("vao day em oi");
        this.isActiveAddEditEmployee = !this.isActiveAddEditEmployee;
    }

    loadData() {
        this.isLoading = true;
        let params = new HttpParams();
        console.log(this.employeeDetail.userID);
        params.append('userId', '' + this.employeeDetail.userID);
         console.log(params);
        this.accountService.getProfileDetail(this.employeeDetail.userID).pipe(first()).subscribe(
            data => {
                this.data = data;
                console.log (data);
                this.isLoading = false;
            },
            error => {
                console.log('như lồn');
                this.isLoading = false;
            }
        )
    }

    reload() {
        this.isActiveAddEditEmployee = false;
        this.loadData();
    }
}