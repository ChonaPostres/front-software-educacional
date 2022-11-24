import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from 'src/shared/model/role';
import { User } from 'src/shared/model/user';
import { RoleService } from 'src/shared/services/role.service';
import { UserService } from 'src/shared/services/user.service';
import { UtilService } from 'src/shared/services/util.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
    email: '',
    nickname: '',
    role: '',
    status: ''
  }
  constructor(
    private srv : UserService,
    private router : Router,
    private snack: MatSnackBar,
    private roleSrv: RoleService,
    private utilSrv : UtilService,
    public formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.filterForm = this.formBuilder.group({
      role   : [''],
      fullname : [''],
      nickname : [''],
      email : [''],
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
        this.snack.open(error.error.error.message, 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5 * 1000,
          panelClass: ['red-snackbar']
        });
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
          this.snack.open(error.error.error.message, 'X', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 5 * 1000,
            panelClass: ['red-snackbar']
          });
        }
    ));
  }
  private getStatus() {
    this.status.push({name: "Eliminado", number: -1})
    this.status.push({name: "Activo", number: 1})
    this.status.push({name: "Bloqueado", number: 2})
    this.find();
  }
  add() {
    this.router.navigate(['/components/users/add']);
  }
  remove(id : string): void {
    const dialogRef = this.dialog.open(UserDeleteDialog, {
      data:{
        id: id
      },
      autoFocus: false,
      maxHeight: "90vh", //you can adjust the value as per your view
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.find();
      console.log("The dialog was closed");
    });
  }
  changeFilter() {
    this.parameters.fullname = this.filterForm.controls['fullname'].value;
    this.parameters.email = this.filterForm.controls['email'].value;
    this.parameters.nickname = this.filterForm.controls['nickname'].value;
    this.parameters.role = this.filterForm.controls['role'].value;
    this.parameters.status = this.filterForm.controls['status'].value;
    console.log(this.parameters);
    this.loadingSrv = true;
    this.find();
  }
}
@Component({
  selector: 'user-delete.dialog',
  templateUrl: 'user-delete.dialog.html',
  providers: [UserService]
})
export class UserDeleteDialog {
  private subscription: Subscription = new Subscription();
  constructor(
    public dialogRef: MatDialogRef<UserDeleteDialog>,
    private snack: MatSnackBar,
    private userSrv : UserService,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: string }
    ) {}
  onCloseClick(): void {
    this.dialogRef.close();
  }
  deleteUser(id: string) {
    this.subscription.add(this.userSrv.remove(id).subscribe(
      response => {
        console.log("Eliminado");
        this.snack.open('Se elimino el usuario!!', 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5 * 1000,
          panelClass: ['green-snackbar']
        });
        this.dialogRef.close();
      },
      error => {
        this.snack.open(error.error.error.message, 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5 * 1000,
          panelClass: ['red-snackbar']
        });
      }
    ));
  }
}