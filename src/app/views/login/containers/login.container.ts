import { SessionFacade } from './../../../session/session.facade';
import { LoginFacade } from './../login.facade';
import { Credentials } from './../../../models/credentials.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.container.html',
  styleUrls: ['./login.container.css'],
})
export class LoginContainerComponent {
  success$: Subscription;
  email = 'rune@mail.com';
  password = 'pass';
  loading = false;
  submitted = false;

  constructor(
    private loginFacade: LoginFacade,
    private sessionFacade: SessionFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log('object');
    if (this.sessionFacade.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onLogin(credentials: Credentials): void {
    // this.submitted = true;

    // this.loading = true;
    this.loginFacade.login(credentials.email, credentials.password);
    // .pipe(first())
    // .subscribe({
    //   next: () => {
    //     // get return url from query parameters or default to home page
    //     const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //     this.router.navigateByUrl(returnUrl);
    //   },
    //   error: (error) => {
    //     // this.error = error;
    //     this.loading = false;
    //   },
    // });
  }
}
