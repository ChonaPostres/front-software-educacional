import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  navLinks = [
    { title: 'Home', router: '/components/home', fragment: 'one'},
    { title: 'Ranking', router: '/components/ranking', fragment: 'two'}
  ]
  constructor(public router : Router) { }

  ngOnInit(): void {
  }
  goHome() {
    this.router.navigate(['components/home']);
  }
  goRanking() {
    this.router.navigate(['components/ranking']);
  }
  goMyProfile() {
    this.router.navigate(['components/my-profile']);
  }
  disconnect() {
    this.router.navigate(['auth/login']);
  }

}
