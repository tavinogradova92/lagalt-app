import { SessionFacade } from './../../../../session/session.facade';
import { UserService } from './../../../../services/user.service';
import { User } from './../../../../models/user.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'new-user-container',
  template: `
    <new-user (registerUser)="handleRegisterUser($event)"></new-user>
  `,
})
export class NewUserContainer {
  constructor(
    private sessionFacade: SessionFacade,
    private userService: UserService
  ) {}

  handleRegisterUser(user: any): void {
    console.log(user);
    const id = this.sessionFacade.sessionValue().user.id;
    this.userService.updateUser({ id, ...user });
  }
}
