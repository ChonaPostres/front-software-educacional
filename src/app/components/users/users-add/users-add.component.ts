import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from 'src/shared/model/role';
import { AuthService } from 'src/shared/services/auth.service';
import { RoleService } from 'src/shared/services/role.service';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
  styleUrls: ['./users-add.component.scss'],
  providers: [AuthService, RoleService]
})
export class UsersAddComponent implements OnInit {
  registForm: FormGroup;
  private subscription: Subscription = new Subscription();
  public roles!: Role[];
  public loading: boolean = true;
  public sideBarOpen = true;
  constructor(
    private _formBuilder: FormBuilder,
    private router : Router,
    public _authSrv: AuthService,
    private roleSrv: RoleService,
    private snack: MatSnackBar
  ) { 
    this.registForm = this._formBuilder.group({
      nickname: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
      name: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
      lastName: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
      email: this._formBuilder.control({value:'', disabled: false}, [Validators.required, Validators.email]),
      role: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
      password: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getRoles();
  }
  private getRoles() {
    this.subscription.add(this.roleSrv.findAllActive().subscribe(
      response => {
        this.roles = response;
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
  doRegist() {
    let credentials = {
      nickname : this.registForm.controls['nickname'].value,
      email : this.registForm.controls['email'].value,
      name : this.registForm.controls['name'].value,
      lastName : this.registForm.controls['lastName'].value,
      role: this.registForm.controls['role'].value,
      password: this.registForm.controls['password'].value
    }
    console.log(credentials);
    this.subscription.add(this._authSrv.register(credentials).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/components/users']);
        this.snack.open('Se creó usuario con éxito!!', 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5 * 1000,
          panelClass: ['green-snackbar']
        });
      },
      error => {
        console.log(error);
        this.snack.open(error.error.error.message, 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5 * 1000,
          panelClass: ['red-snackbar']
        });
      })
    );
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
