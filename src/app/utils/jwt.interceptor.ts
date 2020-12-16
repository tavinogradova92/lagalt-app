import { User } from './../models/user.model';
import { LoginFacade } from './../views/login/login.facade';
import { AuthenticationService } from './../services/authentication.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private readonly user$: Subscription;
  user: User;

  constructor(private authenticationService: LoginFacade) {
    this.user$ = this.authenticationService
      .getLoginUser$()
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    // const user = this.authenticationService.getLoginUser$().;
    console.log('RUNE');
    console.log(this.user);
    const isLoggedIn = this.user && this.user.token;
    const isApiUrl = request.url.startsWith(environment.api.baseUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
