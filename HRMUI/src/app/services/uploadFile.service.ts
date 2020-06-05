import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { EncryptService } from '../services/encrypt.services';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
import {EmployeeDetail} from '../models/employeeDetail'

@Injectable({ providedIn: 'root' })
export class UploadFileService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    uploadAvatar(formdata) {
        return this.http.post(`${environment.apiUrl}/profile/uploadAvatar`, formdata).pipe(map(x => {
                return x;
            }));
    }
}