import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractHttpService } from './abstract-http.service';
import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../model/user';
import { ConstantService } from './constant.service';
@Injectable()
export class UserService extends AbstractHttpService {

    constructor(protected override http: HttpClient) {
        super(http);
    }

    remove(id: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.delete<any>(`${this.apiUrl}/users/${id}`, httpOptions).pipe(
            map(response => {
                return response;
            })
        );
    }

    find() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http
            .get<any>(
                this.apiUrl + '/users', httpOptions)
            .pipe(
                map(response => {
                    return response;
                })
            );
    }

    count() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http
            .get<any>(
                this.apiUrl + '/users/count', httpOptions)
            .pipe(
                map(response => {
                    return response;
                })
            );
    }

    findByEmail(email: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        const filter =
            '{ "where" : { "email": "' + email + '"}}';
        return this.http
            .get<any>(
                this.apiUrl + '/users?filter=' + encodeURIComponent(filter),
                httpOptions
            )
            .pipe(
                map(response => {
                    return response;
                })
            );
    }

    findById(id: string) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.get<any>(`${this.apiUrl}/users/${id}`, httpOptions).pipe(
            map(response => {
                return response;
            })
        );
    }
    add(user: User) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<any>(`${this.apiUrl}/users`, user, httpOptions).pipe(
            map(response => {
                return response;
            })
        );
    }

    update(id: string, user: User) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http
            .put<any>(`${this.apiUrl}/users/${id}`, user, httpOptions)
            .pipe(
                map(response => {
                    return response;
                })
            );
    }
}
