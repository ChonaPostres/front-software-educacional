import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { RankingComponent } from './components/ranking/ranking.component';

const appRoutes:Routes=[
  {path:'', redirectTo: 'auth/login', pathMatch: 'full'},
  {path:'auth/login', component:LoginComponent},
  {path:'auth/register', component:RegisterComponent},
  {path:'auth/forgot-password', component:ForgotPasswordComponent},
  {path:'components/home', component:HomeComponent},
  {path:'components/ranking', component:RankingComponent},
  {path:'components/my-profile', component:MyProfileComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
