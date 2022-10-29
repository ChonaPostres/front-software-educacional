import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $ : any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private authenticate: boolean = true;
  constructor(
    private _formBuilder: FormBuilder,
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
    this.loginForm.disable();
    if (this.authenticate) 
      this.router.navigate(['components/home']);
    else {
      this.loginForm.enable();
    }
    
    
  }
}
