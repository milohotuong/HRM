import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { EncryptService } from '../services/encrypt.services';

import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { EmployeeDetail } from '../models/employeeDetail'

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(username, password) {
        return this.http.post<User>(`${environment.apiUrl}/login`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/users/register`, user);
    }

    getAll(params) {
        return this.http.get(`${environment.apiUrl}/profile/getAll`, { params: params }).pipe(map(x => {
            return x;
        }));
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    add(username, password, department: number) {
        return this.http.post(`${environment.apiUrl}/add`, { username, password, department })
            .pipe(map(x => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                return x;
            }));
    }

    getNumberOfProfile() {
        return this.http.get<number>(`${environment.apiUrl}/profile/getNumberOfProfiles`).pipe(map(x => {
            return x;
        }))
    }

    getProfileDetail(userId) {
        return this.http.get(`${environment.apiUrl}/profile/getProfileDetail?userId=${userId}`).pipe(map(x => {
            return x;
        }))
    }


    // delete(id: number) {
    //     return this.http.delete(`${environment.apiUrl}/users/${id}`)
    //         .pipe(map(x => {
    //             // auto logout if the logged in user deleted their own record
    //             if (id === this.userValue.id) {
    //                 this.logout();
    //             }
    //             return x;
    //         }));
    // }
}