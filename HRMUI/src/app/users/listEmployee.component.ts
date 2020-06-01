import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';

import { AccountService } from '../services/account.service';

import {DatatableComponent} from '@swimlane/ngx-datatable';

import {ViewChild} from '@angular/core';



@Component({templateUrl: './listEmployee.component.html',  selector: 'listEmployee'})
export class listEmployeeComponent implements OnInit {

    // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    data = null;
    rowCount: number;
    pageSize = 7;
    page: string;
    selectedCount: number;
    curPage = 0;
    offset = 0;
    sortBy = 'userId';
    firstLoad = true;
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    @ViewChild('myTable') table: DatatableComponent;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        console.log("con me may");
        this.page = '1';
        let params = new HttpParams();
        params = params.append('page',  '' + this.curPage);
        params = params.append('size', '' + this.pageSize);
        params = params.append('sortBy', this.sortBy);
        this.accountService.getAll(params).pipe(first())
            .subscribe(
                data => {
                    console.log(data);
                    // this.router.navigate(['home']);
                    this.data = data;
                },
                error => {
                    console.log('nh? c?c');
                    // this.alertService.error(error);
                    // this.loading = false;
                });
            }

            loadtable(){

            }
    deleteUser(id: string) {
        const user = this.data.find(x => x.id === id);
        user.isDeleting = true;
        // this.accountService.delete(id);
        //     .pipe(first())
        //     .subscribe(() => {
        //         this.users = this.users.filter(x => x.id !== id) 
        //     });
    }
}