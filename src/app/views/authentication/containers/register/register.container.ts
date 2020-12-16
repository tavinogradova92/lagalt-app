import { LoginFacade } from '../../login.facade';
import { Credentials } from '../../../../models/credentials.model';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'register-view',
  templateUrl: './register.container.html',
})
export class RegisterContainer {
  constructor(private loginFacade: LoginFacade, private router: Router) {}

  registerClicked(credentials: Credentials): void {
    this.loginFacade.register(credentials.email, credentials.password);
  }

  handleRegisterSuccess(): void {
    this.router.navigateByUrl('/');
  }
}
