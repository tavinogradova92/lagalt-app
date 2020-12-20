import { FormService } from './../../../../services/form.service';
import { Credentials } from '../../../../models/credentials.model';
import { LoginFacade } from '../../login.facade';
import { Subscription, Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
  styleUrls: ['../form-styles.component.css', '../../../views.styles.css'],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  @Output() loginClicked: EventEmitter<Credentials> = new EventEmitter();
  @Output() successful: EventEmitter<void> = new EventEmitter<void>();

  success$: Subscription;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(
      'rune@mail.com',
      this.formService.validatorRequiredEmail()
    ),
    password: new FormControl(
      'password',
      this.formService.validatorRequiredPassword()
    ),
  });

  constructor(
    private loginFacade: LoginFacade,
    private formService: FormService
  ) {
    this.success$ = this.loginFacade.success$().subscribe((success) => {
      if (success) {
        this.successful.emit();
      }
    });
    this.error$ = this.loginFacade.error$();
    this.isLoading$ = this.loginFacade.isLoading$();
  }

  ngOnInit(): void {
    this.loginFacade.resetError();
  }

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  onInputFocus(): void {
    this.loginFacade.resetError();
  }

  onLogin(): void {
    this.loginClicked.emit(this.loginForm.value);
  }

  ngOnDestroy(): void {
    this.success$.unsubscribe();
  }
}
