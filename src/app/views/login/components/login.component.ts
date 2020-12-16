import { Credentials } from './../../../models/credentials.model';
import { LoginFacade } from './../login.facade';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginFormComponent implements OnDestroy {
  @Output() loginClicked: EventEmitter<Credentials> = new EventEmitter();

  @Output() successful: EventEmitter<void> = new EventEmitter<void>();

  success$: Subscription;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('rune@mail.com', [Validators.required]),
    password: new FormControl('pass', [Validators.required]),
  });

  // private readonly success$: Subscription;

  constructor(private loginFacade: LoginFacade) {
    this.success$ = this.loginFacade.success$().subscribe((_) => {
      this.successful.emit();
    });
    // Using async pipe in HTML.
    this.isLoading$ = this.loginFacade.isLoading$();
    this.error$ = this.loginFacade.error$();
  }
  // loading = false;
  // submitted = false;

  onLogin(): void {
    this.loginClicked.emit(this.loginForm.value);
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

  ngOnDestroy(): void {
    this.success$.unsubscribe();
  }
}
