import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from 'src/shared/model/role';
import { User } from 'src/shared/model/user';
import { RoleService } from 'src/shared/services/role.service';
import { UserService } from 'src/shared/services/user.service';
import { UtilService } from 'src/shared/services/util.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UserService, UtilService, RoleService]
})
export class UsersComponent implements OnInit {
  public loading: boolean = true;
  public loadingSrv: boolean = true;
  private subscribe: Subscription = new Subscription();
  public users!: User[];
  public status: any[] = [];
  public roles!: Role[];
  public filterForm: FormGroup;
  private parameters = {
    fullname: '',
    role: '',
    status: ''
  }
  constructor(
    private srv : UserService,
    private router : Router,
    private snack: MatSnackBar,
    private roleSrv: RoleService,
    private utilSrv : UtilService,
    public formBuilder: FormBuilder
  ) {
    this.filterForm = this.formBuilder.group({
      role   : [''],
      fullname : [''],
      status: ['']
    });
  }

  ngOnInit(): void {
    this.getRoles();
  }
  private find() {
    this.subscribe.add(this.srv.findWithParams(this.parameters).subscribe(
      response => {
        this.users = response;
        this.loading = false;
        this.loadingSrv = false;
      },
      error => {

      }
    ))
  }
  private getRoles(){
    this.subscribe.add(this.roleSrv.findAllActive().subscribe(
        response => {
          this.roles = response;
          this.getStatus();
        },
        error => {
          console.log(error);
        }
    ));
  }
  private getStatus() {
    this.status.push({name: "Eliminado", number: -1})
    this.status.push({name: "Activo", number: 1})
    this.status.push({name: "Bloqueado", number: 2})
    this.find();
  }
  remove(id : string) {

  }
  add() {

  }
  changeFilter() {
    this.parameters.fullname = this.filterForm.controls['fullname'].value
    this.parameters.role = this.filterForm.controls['role'].value
    this.parameters.status = this.filterForm.controls['status'].value
    this.loadingSrv = true;
    this.find();
  }
}
