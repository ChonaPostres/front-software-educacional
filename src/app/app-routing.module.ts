import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ActivatePasswordComponent } from './auth/activate-password/activate-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ActivityComponent } from './components/activity/activity.component';
import { CategoryComponent } from './components/category/category.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { UsersAddComponent } from './components/users/users-add/users-add.component';
import { UsersDetailComponent } from './components/users/users-detail/users-detail.component';
import { UsersEditComponent } from './components/users/users-edit/users-edit.component';
import { UsersComponent } from './components/users/users.component';

const appRoutes:Routes=[
  {path:'', redirectTo: 'auth/login', pathMatch: 'full'},
  {path:'auth/login', component:LoginComponent},
  {path:'auth/register', component:RegisterComponent},
  {path:'auth/forgot-password', component:ForgotPasswordComponent},
  {path:'components/home', component:HomeComponent},
  {path:'components/ranking', component:RankingComponent},
  {path:'components/my-profile', component:MyProfileComponent},
  {path:'components/users', component:UsersComponent},
  {path:'components/users/add', component:UsersAddComponent},
  {path:'components/users/edit/:email', component:UsersEditComponent},
  {path:'components/users/view/:email', component:UsersDetailComponent},
  {path:'components/category/:id', component:CategoryComponent},
  {path:'components/activity/:id', component:ActivityComponent},
  {path:'auth/activate-password', component:ActivatePasswordComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
