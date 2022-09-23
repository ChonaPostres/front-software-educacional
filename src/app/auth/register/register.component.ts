import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registForm: FormGroup = this._formBuilder.group({
    nickname: this._formBuilder.control({value:'', disabled: false}),
    name: this._formBuilder.control({value:'', disabled: false}),
    lastName: this._formBuilder.control({value:'', disabled: false}),
    email: this._formBuilder.control({value:'', disabled: false}),
    password: this._formBuilder.control({value:'', disabled: false}),
  });
  constructor(
    private _formBuilder: FormBuilder,
    private router : Router
    ) { }

  ngOnInit(): void {
  }
  doRegist() {
    this.router.navigate(['/auth/login']);
  }
}
