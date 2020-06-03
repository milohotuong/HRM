import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { HttpParams, HttpClient } from '@angular/common/http';

import { AccountService } from '../services/account.service';

@Component({templateUrl: './list.component.html',  selector: 'users'})
export class ListComponent implements OnInit{

    // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    users = null;
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
    tabIndex: number;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.tabIndex = 1;
        // let params = new HttpParams();
        // params = params.append('page', '0');
        // params = params.append('size', '10');
        // params = params.append('sortBy', 'userId');
        // this.accountService.getAll(params).pipe(first())
        //     .subscribe(
        //         data => {
        //             console.log(data);
        //             // this.router.navigate(['home']);
        //             this.users = data;
        //         },
        //         error => {
        //             console.log('nh? c?c');
        //             // this.alertService.error(error);
        //             // this.loading = false;
        //         });
            }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        // this.accountService.delete(id);
        //     .pipe(first())
        //     .subscribe(() => {
        //         this.users = this.users.filter(x => x.id !== id) 
        //     });
    }

    changeTab(tabIndex: number) {
        console.log("vào cho bố");
        this.tabIndex = 2;
        this.tabIndex = tabIndex;
    }


}