import { RegisterContainer } from './containers/register/register.container';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginContainer } from './containers/login/login.container';

const routes: Routes = [
  {
    path: 'login',
    component: LoginContainer,
  },
  {
    path: 'register',
    component: RegisterContainer,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
