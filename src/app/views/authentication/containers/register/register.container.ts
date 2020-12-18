import { User } from 'src/app/models/user.model';
import { LoginFacade } from '../../login.facade';
import { Credentials } from '../../../../models/credentials.model';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'register-view',
  templateUrl: './register.container.html',
})
export class RegisterContainer {
  isLeftVisible = true;
  newUser: User = null;

  constructor(private loginFacade: LoginFacade, private router: Router) {}

  onFirstStepRegister(credentials: Credentials): void {
    this.newUser = { ...this.newUser, ...credentials };
    this.isLeftVisible = false;
  }

  registerClicked(user: User): void {
    const newUser = { ...this.newUser, ...user };
    this.loginFacade.register(newUser);
  }

  handleRegisterSuccess(): void {
    this.router.navigateByUrl('/');
  }

  goBack(): void {
    this.isLeftVisible = true;
    this.newUser = null;
  }
}
