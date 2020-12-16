import { LoginFacade } from './../../views/login/login.facade';
import { Router } from '@angular/router';
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

  constructor(private loginFacade: LoginFacade, private router: Router) {
    this.user$ = this.loginFacade
      .getLoginUser$()
      .subscribe((currentUser: User) => {
        this.user = currentUser;
      });
    // TODO should unsubscribe
    router.events.subscribe((val: any) => {
      if (val.url) {
        this.isLoginPage = val.url === '/login';
      }
    });
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }

  onProfileClick(): void {
    this.router.navigateByUrl(`/users/${this.user.id}`);
  }

  logout(): void {
    this.loginFacade.logout();
  }
}
