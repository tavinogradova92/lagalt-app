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
  ],
  imports: [CommonModule, ReactiveFormsModule, LoginRoutingModule],
  providers: [],
})
export class LoginModule {}
