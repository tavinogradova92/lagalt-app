import { LoginFacade } from '../../login.facade';
import { Credentials } from '../../../../models/credentials.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.container.html',
})
export class LoginContainer {
  success$: Subscription;

  constructor(private loginFacade: LoginFacade, private router: Router) {}

  loginClicked(credentials: Credentials): void {
    this.loginFacade.login(credentials.email, credentials.password);
  }

  handleLoginSuccess(): void {
    this.router.navigateByUrl('/');
  }
}
