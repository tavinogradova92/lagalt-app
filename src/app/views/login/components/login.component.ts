import { LoginFacade } from './../login.facade';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginFormComponent {
  @Output() onLoginClicked: EventEmitter<{
    email: String;
    password: String;
  }> = new EventEmitter();

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('rune@mail.com'),
    password: new FormControl('pass'),
  });

  private readonly success$: Subscription;

  constructor(private loginFacade: LoginFacade) {
    // this.success$ = this.loginFacade.success$.subscribe((s) => {
    //   console.log('object');
    // });
  }
  // loading = false;
  // submitted = false;

  onLogin() {
    this.onLoginClicked.emit(this.loginForm.value);
    // this.submitted = true;

    // this.loading = true;
    // this.authenticationService.login(this.email, this.password);
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
