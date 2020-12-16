import { Credentials } from './../../../../models/credentials.model';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginFacade } from '../../login.facade';
import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'register-form',
  templateUrl: './register.component.html',
  styleUrls: ['../form-styles.component.css'],
})
export class RegisterComponent implements OnDestroy {
  @Output() registerClicked: EventEmitter<Credentials> = new EventEmitter();
  @Output() successful: EventEmitter<void> = new EventEmitter<void>();

  success$: Subscription;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  registerForm: FormGroup = new FormGroup({
    email: new FormControl('rune@mail.com', [Validators.required]),
    password: new FormControl('pass', [Validators.required]),
    repeatedPassword: new FormControl('pass', [Validators.required]),
  });

  constructor(private loginFacade: LoginFacade) {
    this.success$ = this.loginFacade.success$().subscribe((_) => {
      this.successful.emit();
    });
    this.error$ = this.loginFacade.error$();
    this.isLoading$ = this.loginFacade.isLoading$();
  }

  onRegister(): void {
    this.registerClicked.emit(this.registerForm.value);
  }

  ngOnDestroy(): void {
    this.success$.unsubscribe();
  }
}
