import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  public sideBarOpen = true;
  constructor(
    private router : Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
  }
  
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
