import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { User } from 'src/app/models/user.model';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnDestroy {
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
    // TODO should unsubscribe
    router.events.subscribe((val: any) => {
      if (val.url) {
        this.isLoginPage = val.url === '/login';
      }
    });
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  onProfileClick() {
    this.router.navigateByUrl(`/users/${this.user.id}`);
  }

  logout() {
    this.authenticationService.logout();
  }
}
