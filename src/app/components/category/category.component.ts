import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  activities:any[] = [];
  constructor(
    private router : Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') == '1') {
      this.activities.push({title: 'Nombre Actividad', id: '1.1'});
      this.activities.push({title: 'Nombre Actividad', id: '1.2'});
      this.activities.push({title: 'Nombre Actividad', id: '1.3'});
      this.activities.push({title: 'Nombre Actividad', id: '1.4'});
      this.activities.push({title: 'Nombre Actividad', id: '1.5'});
      this.activities.push({title: 'Nombre Actividad', id: '1.6'});
    } else if (this.route.snapshot.paramMap.get('id') == '2') {
      this.activities.push({title: 'Nombre Actividad', id: '2.1'});
      this.activities.push({title: 'Nombre Actividad', id: '2.2'});
      this.activities.push({title: 'Nombre Actividad', id: '2.3'});
      this.activities.push({title: 'Nombre Actividad', id: '2.4'});
      this.activities.push({title: 'Nombre Actividad', id: '2.5'});
      this.activities.push({title: 'Nombre Actividad', id: '2.6'});
    } else if (this.route.snapshot.paramMap.get('id') == '3') {
      this.activities.push({title: 'Nombre Actividad', id: '3.1'});
      this.activities.push({title: 'Nombre Actividad', id: '3.2'});
      this.activities.push({title: 'Nombre Actividad', id: '3.3'});
      this.activities.push({title: 'Nombre Actividad', id: '3.4'});
      this.activities.push({title: 'Nombre Actividad', id: '3.5'});
      this.activities.push({title: 'Nombre Actividad', id: '3.6'});
    }
    console.log(this.activities);
  }
  goActivity(id: string) {
    this.router.navigate(['components/activity/'+id]);
  }
}
