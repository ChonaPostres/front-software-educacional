import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractHttpService } from './abstract-http.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from './../model/role';

import { ConstantService } from './constant.service';
@Injectable()
export class RoleService extends AbstractHttpService {

  constructor(protected override http: HttpClient) {
    super(http);
  } 

  count() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http
      .get<any>(
        this.apiUrl + '/roles/count', httpOptions)
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  remove(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete<any>(`${this.apiUrl}/roles/${id}`, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }

  findAll() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let filter = '{ "order": [ "title ASC"]}';
    return this.http
      .get<any>(
        this.apiUrl + '/roles?filter=' + encodeURIComponent(filter),
        httpOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  findAllActive() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let filter = '{ "where": { "status" : 1 }, "order": [ "title ASC"]}';
    return this.http
      .get<any>(
        this.apiUrl + '/roles?filter=' + encodeURIComponent(filter),
        httpOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  find(page : number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    let skip = 0;
    if (page > 0) {
      skip = ConstantService.paginationDesktop * page;
    }
    let filter = '{ "skip": "' + skip +'", "limit": "' + ConstantService.paginationDesktop + '", "order" : ["name ASC"]}';
    return this.http
      .get<any>(
        this.apiUrl + '/roles?filter=' + encodeURIComponent(filter),
        httpOptions
      )
      .pipe(
        map(response => {
          return response;
        })
      );
  }

  findByName(name: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const filter =
      '{ "where" : { "title": "' + name + '"}}';
    return this.http
      .get<any>(
        this.apiUrl + '/roles?filter=' + encodeURIComponent(filter),
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
    return this.http.get<any>(`${this.apiUrl}/roles/${id}`, httpOptions).pipe(
      map(response => {
        return response;
      })
    );
  }
}
