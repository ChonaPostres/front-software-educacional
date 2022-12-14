import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import  Users  from "src/assets/json/users.json";
import { User } from 'src/shared/model/user';
import { UserService } from 'src/shared/services/user.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  providers: [UserService]
})
export class RankingComponent implements OnInit {
  //users:any = Users;
  public perfil =  JSON.parse(localStorage.getItem('profile')!);
  public users!: User[];
  private subscribe: Subscription = new Subscription();
  public loading: boolean = true;
  public sideBarOpen = true;
  constructor(
    private _formBuilder: FormBuilder,
    private userSrv : UserService,
    private router : Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log(this.perfil);
    this.find();
  }
  private find() {
    this.subscribe.add(this.userSrv.findGamers().subscribe(
      response => {
        this.users = response;
        this.ordenarRankingUsers();
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
  goHome() {
    this.router.navigate(['/components/home']);
  }
  /**
   * Ordenar usuario por puntos
   */
  ordenarRankingUsers() {
    this.users.sort( (a, b) => {
      if (a.score == b.score) {
        return 0;
      }
      if (a.score > b.score) {
        return -1;
      }
      return 1;
    });
  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
