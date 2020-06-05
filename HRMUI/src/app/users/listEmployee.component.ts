import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';

import { AccountService } from '../services/account.service';

import { DatatableComponent } from '@swimlane/ngx-datatable';

import { ViewChild } from '@angular/core';

import { EmployeeDetail } from '../models/employeeDetail';



@Component({ templateUrl: './listEmployee.component.html', selector: 'listEmployee' })
export class ListEmployeeComponent implements OnInit {

    // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    data = null;
    rowCount: number;
    totalElements: number;
    pageSizes = 10;
    page: number;
    selectedCount: number;
    currentPage: number;
    offset = 0;
    sortBy = 'userId';
    firstLoad = true;
    isLoading = false;
    isActiveDetail = false;
    selectedRow: EmployeeDetail;
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    @ViewChild('myTable') table: DatatableComponent;

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        console.log("con me may init");
        this.loadtable(1, this.pageSizes, 'userId', true);
    }

    loadtable(curPage: number, pageSize: number, sortBy: string, firstLoad: boolean) {
        this.isLoading = true;
        this.currentPage = curPage;
        let params = new HttpParams();
        if (this.firstLoad) {
            this.accountService.getNumberOfProfile().pipe(first()).subscribe(
                data => {
                    this.totalElements = data;
                    console.log('rowCount' + this.rowCount);
                    this.firstLoad = false;
                },
                error => {
                    console.log('như lồn');
                }
            )
        }
        params = params.append('page', '' + (this.currentPage - 1));
        params = params.append('size', '' + pageSize);
        params = params.append('sortBy', sortBy);
        this.accountService.getAll(params).pipe(first())
            .subscribe(
                data => {
                    console.log(data);
                    // this.router.navigate(['home']);
                    this.data = data;
                    this.isLoading = false;
                },
                error => {
                    console.log('nh? c?c');
                    // this.alertService.error(error);
                    // this.loading = false;
                    this.isLoading = false;
                });
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

    onChange(event: any) {
        console.log("con cac");
        this.currentPage = event.page;
        this.loadtable(this.currentPage, this.pageSizes, this.sortBy, false);
    }

    setPage(event: any) {
        console.log("cai lon");
    }

    onFooterPage(event: any) {
        console.log("dit me may");
        // this.curPage = event.curPage;
    }

    onActivate(event) {
        if (event.type === 'click') {
            this.selectedRow = event.row;
            console.log(this.selectedRow);
            this.isActiveDetail = true;
        }
    }

    reload() {
        this.isActiveDetail = false;
        this.loadtable(1, this.pageSizes, 'userId', true);
    }

}