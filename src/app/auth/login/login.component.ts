import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth.service';
import { Subscription } from 'rxjs';
declare var $ : any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ AuthService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private subscription: Subscription = new Subscription();
  constructor(
    private _formBuilder: FormBuilder,
    private _authSrv : AuthService,
    private router : Router
  ) { 
    this.loginForm = this._formBuilder.group({
      email: this._formBuilder.control({value: '', disabled: false}, [Validators.required]),
      password: this._formBuilder.control({value: '', disabled: false}, [Validators.required])
    });
  }

  ngOnInit(): void {
    
  }

  doRegist() {
    this.router.navigate(['/auth/register']);
  }
  
  doLogin() {
    let credentials = {
      email : this.loginForm.controls['email'].value,
      password : this.loginForm.controls['password'].value

    }
    this.loginForm.disable();
    this.subscription.add(this._authSrv.signIn(credentials).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['components/home']);
      },
      error => {
        console.log(error);
      }
    ));
    
      this.loginForm.enable();
    
    
    
  }
}
