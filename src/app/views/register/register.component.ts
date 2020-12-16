import { LoginFacade } from './../login/login.facade';
import { SessionFacade } from './../../session/session.facade';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'register-view',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = 'rune@mail.com';
  password: string = 'pass';
  loading = false;
  submitted = false;
  isLoggedIn: boolean;

  constructor(
    private sessionFacade: SessionFacade,
    private loginFacade: LoginFacade,
    private router: Router
  ) {
    // this.loginFacade
    //   .getLoginUser$()
    //   .pipe(tap((user) => (this.isLoggedIn = !!user)));
    // // .subscribe((currentUser: User) => {
    // //   this.user = currentUser;
    // // });
    if (this.sessionFacade.isLoggedIn()) {
      console.log('register');
      this.router.navigate(['/']);
    }
  }

  onRegister(): void {
    this.submitted = true;

    this.loading = true;
    this.loginFacade.register(this.email, this.password);
    // .pipe(first())
    // .subscribe({
    //   next: () => {
    //     const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //     this.router.navigateByUrl(returnUrl);
    //   },
    //   error: (error) => {
    //     this.loading = false;
    //   },
    // });
  }
}
