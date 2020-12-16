import { LoginFacade } from './../login.facade';
import { Credentials } from './../../../models/credentials.model';
import { LoginState } from './../state/login.state';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
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
    private authenticationService: LoginFacade,
    private loginState: LoginState,
    private router: Router,
    private route: ActivatedRoute
  ) {
    console.log('object');
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  onLogin(credentials: Credentials): void {
    // this.submitted = true;

    // this.loading = true;
    this.authenticationService.login(credentials.email, credentials.password);
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
