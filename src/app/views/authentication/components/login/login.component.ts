import { Credentials } from '../../../../models/credentials.model';
import { LoginFacade } from '../../login.facade';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['../form-styles.component.css'],
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

  constructor(private loginFacade: LoginFacade) {
    this.success$ = this.loginFacade.success$().subscribe((_) => {
      this.successful.emit();
    });
    this.error$ = this.loginFacade.error$();
    this.isLoading$ = this.loginFacade.isLoading$();
  }

  onLogin(): void {
    this.loginClicked.emit(this.loginForm.value);
  }

  ngOnDestroy(): void {
    this.success$.unsubscribe();
  }
}
