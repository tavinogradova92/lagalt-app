import { LoginFacade } from '../../login.facade';
import { Subscription, Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['../form-styles.component.css', '../../../views.styles.css'],
})
export class NewUserComponent implements OnDestroy {
  @Output() goBack: EventEmitter<void> = new EventEmitter();
  @Output() registerUser: EventEmitter<User> = new EventEmitter();
  @Output() successful: EventEmitter<void> = new EventEmitter();

  success$: Subscription;
  error$: Observable<string>;
  isLoading$: Observable<boolean>;

  hasclickedRegistered = false;

  createUserForm: FormGroup = new FormGroup({
    image: new FormControl(
      'https://gitlab.com/rhout/lagalt-images/-/raw/master/profiles/male-avatar2.jpg'
    ),
    name: new FormControl('Rune', [Validators.required]),
    description: new FormControl('', []),
    portfolio: new FormControl('', []),
  });

  constructor(private loginFacade: LoginFacade) {
    this.success$ = this.loginFacade.success$().subscribe((_) => {
      if (this.hasclickedRegistered) {
        this.successful.emit();
      }
    });
  }

  get name(): any {
    return this.createUserForm.get('name');
  }

  handleRegisterUser(): void {
    this.hasclickedRegistered = true;
    this.registerUser.emit(this.createUserForm.value);
  }

  ngOnDestroy(): void {
    this.success$.unsubscribe();
  }
}
