import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  public perfil =  JSON.parse(localStorage.getItem('profile')!);
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
  goUsers() {
    this.router.navigate(['components/users']);
  }
  disconnect() {
    localStorage.removeItem('profile');
    this.router.navigate(['auth/login']);
  }
  haveAcces() {
    return this.perfil.role.slug == 'administrador' ? true : false;
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

}
