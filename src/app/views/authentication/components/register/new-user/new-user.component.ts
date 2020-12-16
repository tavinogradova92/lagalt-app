import { User } from '../../../../../models/user.model';
import { Skill } from '../../../../../models/skill.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent {
  @Output() registerUser: EventEmitter<any> = new EventEmitter();

  createUserForm: FormGroup = new FormGroup({
    image: new FormControl(
      'https://gitlab.com/rhout/lagalt-images/-/raw/master/profiles/male-avatar2.jpg',
      [Validators.required]
    ),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', []),
    portfolio: new FormControl('', []),
  });

  skills: Skill[];

  constructor() {}

  handleRegisterUser(): void {
    this.registerUser.emit(this.createUserForm.value);
  }
}
