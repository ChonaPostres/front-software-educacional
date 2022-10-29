import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import  Users  from "src/assets/json/users.json";
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  users:any = Users;
  constructor(
    private _formBuilder: FormBuilder,
    private router : Router
  ) { }

  ngOnInit(): void {
    /*this.users.push({title: "Nombre Usuario", id: "1"});
    this.users.push({title: "Nombre Usuario", id: "2"});
    this.users.push({title: "Nombre Usuario", id: "3"});
    this.users.push({title: "Nombre Usuario", id: "4"});
    this.users.push({title: "Nombre Usuario", id: "5"});
    this.users.push({title: "Nombre Usuario", id: "6"});
    this.users.push({title: "Nombre Usuario", id: "7"});
    this.users.push({title: "Nombre Usuario", id: "8"});
    this.users.push({title: "Nombre Usuario", id: "9"});
    this.users.push({title: "Nombre Usuario", id: "10"});*/
    console.log(this.users);
  }
  goHome() {
    this.router.navigate(['/components/home']);
  }

}
