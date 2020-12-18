import { FormService } from './../../../../services/form.service';
import { Credentials } from './../../../../models/credentials.model';
import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginFacade } from '../../login.facade';
import {
  Component,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'register-form',
  templateUrl: './register.component.html',
  styleUrls: ['../form-styles.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  @Output() firstStepCompleted: EventEmitter<Credentials> = new EventEmitter();

  success$: Subscription;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  credentialsForm: FormGroup = new FormGroup(
    {
      email: new FormControl(
        'rune@mail.com',
        this.formService.validatorRequiredEmail()
      ),
      password: new FormControl(
        'password',
        this.formService.validatorRequiredPassword()
      ),
      repeatedPassword: new FormControl(
        'password',
        this.formService.validatorRequiredPassword()
      ),
    },
    {
      validators: this.formService.validatorPasswordMatch(
        'password',
        'repeatedPassword'
      ),
    }
  );

  constructor(
    private loginFacade: LoginFacade,
    private formService: FormService
  ) {
    this.success$ = this.loginFacade.success$().subscribe((_) => {
      this.firstStepCompleted.emit({
        email: this.email.value,
        password: this.password.value,
      });
    });
    this.error$ = this.loginFacade.error$();
    this.isLoading$ = this.loginFacade.isLoading$();
  }

  ngOnInit(): void {
    this.loginFacade.resetError();
  }

  get email(): any {
    return this.credentialsForm.get('email');
  }

  get password(): any {
    return this.credentialsForm.get('password');
  }

  get repeatedPassword(): any {
    return this.credentialsForm.get('repeatedPassword');
  }

  onEmailInputFocus(): void {
    this.loginFacade.resetError();
  }

  onRegister(): void {
    this.loginFacade.checkIfEmailExists(this.credentialsForm.value.email);
  }

  ngOnDestroy(): void {
    this.success$.unsubscribe();
  }
}
