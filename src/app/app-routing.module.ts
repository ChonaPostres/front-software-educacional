import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { RankingComponent } from './components/ranking/ranking.component';

const appRoutes:Routes=[
  {path:'', component:AppComponent},
  {path:'auth/login', component:LoginComponent},
  {path:'auth/register', component:RegisterComponent},
  {path:'components/home', component:HomeComponent},
  {path:'components/ranking', component:RankingComponent},
  {path:'components/my-profile', component:MyProfileComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
