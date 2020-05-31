import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import { AccountService} from '../services/account.service';
import {AlertService} from '../services/alert.service';


@Component({templateUrl: './login.component.html'})
export class LoginComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error: string;

    location: Location
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        location: Location
    ) {
        this.location = this.location;
    }

    ngOnInit() {
        this.error = null;
        this.accountService.logout();
        localStorage.removeItem('user');
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data);
                    this.router.navigate(['home']);
                },
                error => {
                    console.log(JSON.stringify(error));
                    this.error = JSON.stringify(error);
                    this.loading = false;
                });
    }
}