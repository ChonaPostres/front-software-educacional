import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import  Categories  from "src/assets/json/categories.json";
import { UserService } from 'src/shared/services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  categories:any = Categories;
  public perfil =  JSON.parse(localStorage.getItem('profile')!);
  private subscribe: Subscription = new Subscription();
  public loading: boolean = false;
  constructor(
    private _formBuilder: FormBuilder,
    private router : Router,
    private userSrv : UserService,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    //this.categories.push({title: "Nombre Categoria", id: "1"});
    //this.categories.push({title: "Nombre Categoria", id: "2"});
    //this.categories.push({title: "Nombre Categoria", id: "3"});
    console.log(this.categories);

  }
  goRanking() {
    this.router.navigate(['/components/ranking']);
  }
  goCategory(id: string) {
    this.router.navigate(['/components/category/'+id]);
  }

}
