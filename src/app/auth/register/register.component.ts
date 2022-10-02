import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registForm: FormGroup = this._formBuilder.group({
    nickname: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
    name: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
    lastName: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
    email: this._formBuilder.control({value:'', disabled: false}, [Validators.required, Validators.email]),
    password: this._formBuilder.control({value:'', disabled: false}, [Validators.required]),
  });
  get nickname() {
    return this.registForm.get('nickname');
  }
  constructor(
    private _formBuilder: FormBuilder,
    private router : Router
    ) { }

  ngOnInit(): void {
    //var expr = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    $(document).ready(function(){
      $("#bRegistrarme").click(function(){
        var nickname = $("#nickname").val();
        var name = $("#name").val();
        var lastName = $("#lastName").val();
        var email = $("#email").val();
        var password = $("#password").val();
        if (nickname == "") {
          console.log(nickname);
          $("#msjNickname").fadeIn();
          return false;
        } else {
          console.log(nickname);
          $("msjNickname").fadeOut();
          if (name == "") {
            $("#msjName").fadeIn();
            return false;
          } else {
            $("msjName").fadeOut();
            if (lastName == "") {
              $("#msjLastName").fadeIn();
              return false;
            } else {
              $("msjLastName").fadeOut();
            }
            if (email == "") {
              $("#msjEmail").fadeIn();
              return false;
            } else {
              $("msjEmail").fadeOut();
              if (password == "") {
                $("#msjPassword").fadeIn();
                return false;
              } else {
                $("msjPassword").fadeOut();
              }
            }
          }
        }
        return true;
      })
    })
  }
  doRegist() {
    this.router.navigate(['/auth/login']);
  }
}
