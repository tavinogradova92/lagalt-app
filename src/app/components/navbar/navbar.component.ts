import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { User } from 'src/app/models/user.model';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLoginPage: boolean;
  user: User;
  private readonly user$: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.user$ = this.authenticationService.userSubject$.subscribe(
      (currentUser: User) => {
        this.user = currentUser;
      }
    );
    router.events.subscribe((val: any) => {
      if (val.url) {
        this.isLoginPage = val.url === '/login';
      }
    });
  }

  onProfileClick() {
    this.router.navigateByUrl(`/users/${this.user.id}`);
  }

  logout() {
    this.authenticationService.logout();
  }
}
