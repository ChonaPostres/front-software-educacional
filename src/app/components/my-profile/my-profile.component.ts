import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/shared/model/user';
import { UserService } from 'src/shared/services/user.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  providers: [UserService]
})

export class MyProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public user!: User;
  public perfil =  JSON.parse(localStorage.getItem('profile')!);
  private subscribe: Subscription = new Subscription();
  public loading: boolean = true;
  constructor(
    private _formBuilder: FormBuilder,
    private router : Router,
    private userSrv : UserService,
    private snack: MatSnackBar
  ) { 
    this.profileForm = this._formBuilder.group({
      nickname: this._formBuilder.control({value: '', disabled: false}, [Validators.required]),
      email: this._formBuilder.control({value: '', disabled: false}, [Validators.required]),
      name: this._formBuilder.control({value: '', disabled: false}, [Validators.required]),
      lastName: this._formBuilder.control({value: '', disabled: false}, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.findProfile();
  }
  private findProfile() {
    this.subscribe.add(this.userSrv.find().subscribe(
      response => {
        this.user = response[0];
        console.log(this.user);
        this.profileForm.controls['nickname'].setValue(this.user.nickname);
        this.profileForm.controls['email'].setValue(this.user.email);
        this.profileForm.controls['name'].setValue(this.user.name);
        this.profileForm.controls['lastName'].setValue(this.user.lastName);
        this.loading = false;
      },
      error => {
        this.snack.open(error.error.error.message, 'X', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 5 * 1000,
          panelClass: ['red-snackbar']
        });
        this.loading = false;
      }
    ));
  }
  public save() {
    this.user.nickname = this.profileForm.controls['nickname'].value;
    this.user.name = this.profileForm.controls['name'].value;
    this.user.lastName = this.profileForm.controls['lastName'].value;
    this.subscribe.add(this.userSrv.update(this.profileForm.controls['email'].value, this.user).subscribe(
      response => {
        this.snack.open('Los cambios se guardaron con éxito!!', 'X', {
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
        this.loading = false;
      }
    ));
  }
  goHome() {
    this.router.navigate(['/components/home']);
  }
  goRanking() {
    this.router.navigate(['/components/ranking']);
  }


}
