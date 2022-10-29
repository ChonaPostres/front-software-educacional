import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import  Categories  from "src/assets/json/categories.json";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories:any = Categories;
  constructor(
    private _formBuilder: FormBuilder,
    private router : Router
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
