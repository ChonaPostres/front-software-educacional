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
  
  constructor(
    private _formBuilder: FormBuilder,
    private router : Router
  ) { }

  ngOnInit(): void {
    $(function() {
      //$("#login").prop("disabled", true)
      if($("#login").length) {
        $("#email").blur(function() {
          if ($("#login").valid() == false) {
            $("#bLogin").prop("disabled", true);
            return; 
          }
          $("#bLogin").prop("disabled", false);
          return;
        })
        $("#password").blur(function() {
          if ($("#login").valid() == false) {
            $("#bLogin").prop("disabled", true);
            return; 
          }
          $("#bLogin").prop("disabled", false);
          return;
        })
        $("#login").validate({
          rules: {
            email: {
              required: true,
              email: true
            },
            password: {
              required: true
            }
          },
          messages: {
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

    });
    
  }

  doRegist() {
    this.router.navigate(['/auth/register']);
  }
  doLogin() {
    this.router.navigate(['components/home']);
  }
}
