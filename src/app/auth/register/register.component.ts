import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/shared/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
declare var $ : any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registForm: FormGroup;
  private subscription: Subscription = new Subscription();
  constructor(
    private _formBuilder: FormBuilder,
    private router : Router,
    public _authSrv: AuthService,
    private snack: MatSnackBar
    ) {
      this.registForm = this._formBuilder.group({
        nickname: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
        name: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
        lastName: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
        email: this._formBuilder.control({value:'', disabled: false}, [Validators.required, Validators.email]),
        password: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
      });
     }

  ngOnInit(): void {
    /*$(function() {
      $("#login").prop("disabled", true)
      if($("#registration").length) {
        $("#nickname").blur(function() {
          if ($("#registration").valid() == false) {
            $("#bRegistrarme").prop("disabled", true);
            return; 
          }
          $("#bRegistrarme").prop("disabled", false);
          return;
        });
        $("#name").blur(function() {
          if ($("#registration").valid() == false) {
            $("#bRegistrarme").prop("disabled", true);
            return; 
          }
          $("#bRegistrarme").prop("disabled", false);
          return;
        });
        $("#lastName").blur(function() {
          if ($("#registration").valid() == false) {
            $("#bRegistrarme").prop("disabled", true);
            return; 
          }
          $("#bRegistrarme").prop("disabled", false);
          return;
        });
        $("#email").blur(function() {
          if ($("#registration").valid() == false) {
            $("#bRegistrarme").prop("disabled", true);
            return; 
          }
          $("#bRegistrarme").prop("disabled", false);
          return;
        })
        $("#password").blur(function() {
          if ($("#registration").valid() == false) {
            $("#bRegistrarme").prop("disabled", true);
            return; 
          }
          $("#bRegistrarme").prop("disabled", false);
          return;
        });
        $("#registration").validate({
          rules: {
            nickname: {
              required: true
            },
            name: {
              required: true
            },
            lastName: {
              required: true
            },
            email: {
              required: true,
              email: true
            },
            password: {
              required: true
            }
          },
          messages: {
            nickname: {
              required: 'Por favor llene el campo Apodo!'
            },
            name: {
              required: 'Por favor llene el campo Nombre!'
            },
            lastName: {
              required: 'Por favor llene el campo Apellido!'
            },
            email: {
              required: 'Por favor llene el campo Correo Electrónico!',
              //error message for the email field
              email: 'Por favor llene el campo con un correo valido!'
            },
            password: {
              required: 'Por favor llene el campo Contraseña!'
            }
          }
        });
      }

    });*/
  }
  doRegist() {
    let credentials = {
      nickname : this.registForm.controls['nickname'].value,
      email : this.registForm.controls['email'].value,
      name : this.registForm.controls['name'].value,
      lastName : this.registForm.controls['lastName'].value,
      role: 'jugador',
      password: this.registForm.controls['password'].value
    }
    console.log(credentials);
    this.subscription.add(this._authSrv.register(credentials).subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/auth/login']);
        this.snack.open('Se registró con éxito!!', 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5 * 1000,
          panelClass: ['green-snackbar']
        });
      },
      error => {
        this.snack.open(error.error.error.message, 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5 * 1000,
          panelClass: ['red-snackbar']
        });
      })
    );
  }
}
