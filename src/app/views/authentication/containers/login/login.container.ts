import { LoginFacade } from '../../login.facade';
import { Credentials } from '../../../../models/credentials.model';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <login-form
      (successful)="handleLoginSuccess()"
      (loginClicked)="loginClicked($event)"
    ></login-form>
  `,
})
export class LoginContainer {
  constructor(private loginFacade: LoginFacade, private router: Router) {}

  loginClicked(credentials: Credentials): void {
    this.loginFacade.login(credentials.email, credentials.password);
  }

  handleLoginSuccess(): void {
    this.router.navigateByUrl('/');
  }
}
