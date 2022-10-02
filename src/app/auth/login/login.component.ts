import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this._formBuilder.group({
    email: this._formBuilder.control({value:'', disabled: false}, [Validators.required, Validators.email]),
    password: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
  });
  constructor(
    private _formBuilder: FormBuilder,
    private router : Router
  ) { }

  ngOnInit(): void {

  }

  doRegist() {
    this.router.navigate(['/auth/register']);
  }
  doLogin() {
    this.router.navigate(['components/home']);
  }
}
