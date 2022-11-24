import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from 'src/shared/model/role';
import { User } from 'src/shared/model/user';
import { AuthService } from 'src/shared/services/auth.service';
import { RoleService } from 'src/shared/services/role.service';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss'],
  providers: [UserService, RoleService]
})
export class UsersEditComponent implements OnInit {
  public registForm: FormGroup;
  private subscription: Subscription = new Subscription();
  public roles!: Role[];
  public loading: boolean = true;
  private code!: string;
  public user!: User;
  public status: any[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router : Router,
    public _authSrv: AuthService,
    private roleSrv: RoleService,
    private snack: MatSnackBar,
    private srv : UserService,
  ) { 
    this.registForm = this._formBuilder.group({
      nickname: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
      name: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
      lastName: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
      email: this._formBuilder.control({value:'', disabled: false}, [Validators.required, Validators.email]),
      role: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
      status: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.subscription.add(this.activatedRoute.params.subscribe(params => { 
      this.code = params['email'];
      this.getRoles();
    }));
  }
  private getRoles() {
    this.subscription.add(this.roleSrv.findAllActive().subscribe(
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
    this.findUser();
  }
  private findUser() {
    this.subscription.add(this.srv.findByEmail(this.code).subscribe(
      response => {
        this.user = response[0];
        this.registForm.controls['nickname'].setValue(this.user.nickname);
        this.registForm.controls['email'].setValue(this.user.email);
        this.registForm.controls['name'].setValue(this.user.name);
        this.registForm.controls['lastName'].setValue(this.user.lastName);
        this.registForm.controls['role'].setValue(this.user.role);
        this.registForm.controls['status'].setValue(this.user.status);
        console.log(this.user);
        console.log(this.registForm);
        this.loading = false;
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
  public save() {
    this.user.nickname = this.registForm.controls['nickname'].value;
    this.user.name = this.registForm.controls['name'].value;
    this.user.lastName = this.registForm.controls['lastName'].value;
    this.user.role = this.registForm.controls['role'].value;
    this.user.status = this.registForm.controls['status'].value;
    this.subscription.add(this.srv.update(this.registForm.controls['email'].value, this.user).subscribe(
      response => {
        this.snack.open('Los cambios se guardaron con éxito!!', 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5 * 1000,
          panelClass: ['green-snackbar']
        });
        this.router.navigate(['/components/users']);
      },
      error => {
        this.snack.open(error.error.error.message, 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5 * 1000,
          panelClass: ['red-snackbar']
        });
        this.loading = false;
      }
    ));
  }

}
