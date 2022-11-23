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
    private configureFilters(params : any){
        var filter = "";
        let arrParams = [];
        if (params.role !== ''){
          arrParams.push({ field: 'role', value : params.role });
        }
        if (params.status != '') {
          arrParams.push({ field: 'status', value: params.status });
        }
        for (let i = 0 ; i < arrParams.length; i++) {
            if (arrParams.length > 1 && i < arrParams.length -1){
                filter =  filter + '"' + arrParams[i].field + '": "' + arrParams[i].value + '",';
            } else {
                filter =  filter + '"' + arrParams[i].field + '": "' + arrParams[i].value + '"';
            }
        }
        return filter;
      }

      configureFullnameFilters(params : any){
        var filter = "";
        let arrParams = [];
        
        if (params.fullname !== ''){
          let arrName = params.fullname.split(' ');
          if (arrName.length === 1){
            arrParams.push({ field: 'name', value : { "like": arrName[0], options: "i" }});
            arrParams.push({ field: 'lastName', value : { "like": arrName[0], options: "i" }});
    
          } else if (arrName.length === 2){
            arrParams.push({ field: 'name', value : { "like": arrName[0], options: "i" }});
            arrParams.push({ field: 'lastName', value : { "like": arrName[1], options: "i" }});
          }
        }
    
        for (let i = 0; i < arrParams.length; i ++){
          if (arrParams.length > 1 && i < arrParams.length -1){
            if (arrParams[i].field === 'name' || arrParams[i].field === 'lastName'){
              filter =  filter + '{"' + arrParams[i].field + '": ' + JSON.stringify(arrParams[i].value) + '},';
            } 
          } else {
            if (arrParams[i].field === 'name' || arrParams[i].field === 'lastName'){
              filter =  filter + '{ "' + arrParams[i].field + '": ' + JSON.stringify(arrParams[i].value) + '}';
            } 
          }
        }
        return filter;
    }
    findWithParams(params : any) {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        };
        let filter = "{";
        let filter2 = this.configureFilters(params);
        let filter3 = this.configureFullnameFilters(params);
    
        if (filter2 === "" && filter3 === ""){
          filter = filter + '}';
        }
        if (filter2 !== "" && filter3 === ""){
            filter = filter + ' "where": { "and": [ {' + filter2 + '} ] }}';
        }
        if (filter2 === "" && filter3 !== ""){
          filter = filter + ' "where": { "and": [ {"or": [' + filter3 + ']} ]}}';
        }
        if (filter2 !== "" && filter3 !== ""){
            filter = filter + ' "where": { "and": [ {' + filter2 + '}, { "or": [' + filter3 + '] } ] }}';
        }
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
    findGamers() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http
            .get<any>(
                this.apiUrl + '/users/gamers', httpOptions)
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
