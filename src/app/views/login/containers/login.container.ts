import { LoginState } from './../state/login.state';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.container.html',
  styleUrls: ['./login.container.css'],
})
export class LoginContainer {
  success$: Subscription;
  email: String = 'rune@mail.com';
  password = 'pass';
  loading = false;
  submitted = false;

  constructor(
    private authenticationService: AuthenticationService,
    private loginState: LoginState,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // this.success$ = this.loginState
    //   .getSuccess$()
    //   .subscribe((success: boolean) => {
    //     success && this.router.navigate(['/']);
    //   });

    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  onLogin(credentials) {
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
