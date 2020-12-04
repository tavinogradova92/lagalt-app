import { UserService } from './../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'user-profile',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user$: Observable<User>;
  patchResponseMessage: string;
  patchError = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.data.pipe(pluck('0'));
  }

  onSave(user: User): void {
    this.patchResponseMessage = '';
    this.userService.updateUser(user).subscribe((response) => {
      this.patchError = !!response;
      this.patchResponseMessage = this.patchError
        ? 'An error occurred. Try again later.'
        : 'Updated succesfully!';
    });
  }
}
