import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../services/account.service';
import { AlertService } from '../services/alert.service';
import { UploadFileService } from '../services/uploadFile.service';
import { HttpParams } from '@angular/common/http';

@Component({ templateUrl: './addEditEmployee.component.html', selector: 'addEditEmployee' })
export class AddEditEmployeeComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    isLoading: boolean;
    submitted = false;
    fileImage: File;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private uploadFileService: UploadFileService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', passwordValidators]
        });

        if (!this.isAddMode) {
            this.accountService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    // this.f.firstName.setValue(x.firstName);
                    // this.f.lastName.setValue(x.lastName);
                    // this.f.username.setValue(x.username);
                });
        }
    }

    // // convenience getter for easy access to form fields
    // get f() { return this.form.controls; }

    // onSubmit() {
    //     this.submitted = true;

    //     // reset alerts on submit
    //     this.alertService.clear();

    //     // stop here if form is invalid
    //     if (this.form.invalid) {
    //         return;
    //     }

    //     this.loading = true;
    //     if (this.isAddMode) {
    //         this.createUser();
    //     } else {
    //         this.updateUser();
    //     }
    // }

    // private createUser() {
    //     this.accountService.register(this.form.value)
    //         .pipe(first())
    //         .subscribe(
    //             data => {
    //                 this.alertService.success('User added successfully', { keepAfterRouteChange: true });
    //                 this.router.navigate(['.', { relativeTo: this.route }]);
    //             },
    //             error => {
    //                 this.alertService.error(error);
    //                 this.loading = false;
    //             });
    // }

    // private updateUser() {
    //     this.accountService.update(this.id, this.form.value)
    //         .pipe(first())
    //         .subscribe(
    //             data => {
    //                 this.alertService.success('Update successful', { keepAfterRouteChange: true });
    //                 this.router.navigate(['..', { relativeTo: this.route }]);
    //             },
    //             error => {
    //                 this.alertService.error(error);
    //                 this.loading = false;
    //             });
    // }

    handleFileInput(files: FileList) {
        console.log("nhận file");
        this.fileImage = files.item(0);
    }

        loadData() {
        this.isLoading = true;
        let params = new HttpParams();
        console.log(this.employeeDetail.userID);
        params.append('userId', '' + this.employeeDetail.userID);
         console.log(params);
        this.accountService.getProfileDetail(this.employeeDetail.userID).pipe(first()).subscribe(
            data => {
                console.log (data);
                this.isLoading = false;
            },
            error => {
                console.log('như lồn');
                this.isLoading = false;
            }
        )
    }

    sumitData() {
        console.log("vào submit");
        const formdata = new FormData();
        formdata.append('multipartFile', this.fileImage);
        this.uploadFileService.uploadAvatar(formdata).pipe(first())
            .subscribe(
                data => {
                    console.log(data)
                },
                error => {
                    this.alertService.error(error);
                    this.isLoading = false;
                });
    }
}