import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService } from '../services/account.service';
import { AlertService } from '../services/alert.service';
import { UploadFileService } from '../services/uploadFile.service';
import { HttpParams } from '@angular/common/http';
import { EmployeeDetail } from '../models/employeeDetail';

@Component({ templateUrl: './addEditEmployee.component.html', selector: 'addEditEmployee' })
export class AddEditEmployeeComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    isLoading: boolean;
    submitted = false;
    fileImage: File;
    data: any;
    rootdata: any;
    differ: any;
    haschange: boolean;
    error: boolean
    @Input()
    employeeDetail: EmployeeDetail;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService,
        private uploadFileService: UploadFileService
    ) { }

    ngOnInit() {
        this.haschange = true;
        this.error = null;
        this.loadData();
    }


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
                console.log(data);
                this.rootdata = Object.assign({}, data);
                this.data = data;
                this.isLoading = false;
            },
            error => {
                this.error = error;
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
                    this.error = error;
                    this.alertService.error(error);
                    this.isLoading = false;
                });
    }

    handleClick(value: number) {
        console.log("vào handle");
        this.data.gender = value;
    }

    hasDataChange() {
        console.log(this.data);
        console.log(this.rootdata);
        console.log("dmmmmmmmmmm");
        if (JSON.stringify(this.data) !== JSON.stringify(this.rootdata)) {
            this.haschange = true;
        }
        else this.haschange = false;
    }

    revertData() {
        this.data = Object.assign({}, this.rootdata);
        this.haschange = true;
    }
}