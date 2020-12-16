import { ReactiveFormsModule } from '@angular/forms';
import { LoginContainerComponent } from './containers/login.container';
import { LoginFormComponent } from './components/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LoginFormComponent, LoginContainerComponent],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [],
})
export class LoginModule {}
