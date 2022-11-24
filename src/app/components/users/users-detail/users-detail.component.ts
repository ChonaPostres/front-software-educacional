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
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss'],
  providers: [UserService, RoleService]
})
export class UsersDetailComponent implements OnInit {
  public registForm!: FormGroup;
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
        this.registForm = this._formBuilder.group({
          nickname: this._formBuilder.control({value: this.user.nickname, disabled: true}, [Validators.required]),
          name: this._formBuilder.control({value: this.user.name, disabled: true}, [Validators.required]),
          lastName: this._formBuilder.control({value: this.user.lastName, disabled: true}, [Validators.required]),
          email: this._formBuilder.control({value: this.user.email, disabled: true}, [Validators.required, Validators.email]),
          role: this._formBuilder.control({value: this.user.role, disabled: true}, [Validators.required]),
          status: this._formBuilder.control({value: this.status, disabled: true}, [Validators.required]),
        });
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
  public goBack() {
    this.router.navigate(['/components/users']);
  }

}
