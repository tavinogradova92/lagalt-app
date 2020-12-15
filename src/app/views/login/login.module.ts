import { LoginFacade } from './login.facade';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginContainer } from './containers/login.container';
import { LoginFormComponent } from './components/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoginFormComponent, LoginContainer],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [LoginFormComponent, LoginContainer],
  providers: [],
})
export class LoginModule {}
