import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activate-password',
  templateUrl: './activate-password.component.html',
  styleUrls: ['./activate-password.component.scss']
})
export class ActivatePasswordComponent implements OnInit {
  registerForm: FormGroup = this._formBuilder.group({
    newPassword: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
    confirmNewPassword: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
  });
  constructor(
    private _formBuilder: FormBuilder,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  setPassword() {
    this.router.navigate(['auth/login']);
  }

}
