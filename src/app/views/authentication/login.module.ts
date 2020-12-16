import { NewUserContainer } from './containers/new-user/new-user.container';
import { NewUserComponent } from './components/register/new-user/new-user.component';
import { RegisterContainer } from './containers/register/register.container';
import { RegisterComponent } from './components/register/register.component';
import { LoginRoutingModule } from './login-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginContainer } from './containers/login/login.container';
import { LoginFormComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginContainer,
    RegisterContainer,
    RegisterComponent,
    NewUserComponent,
    NewUserContainer,
  ],
  imports: [CommonModule, ReactiveFormsModule, LoginRoutingModule],
  providers: [],
})
export class LoginModule {}
