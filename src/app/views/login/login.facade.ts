import { Session } from './../../models/session.model';
import { SessionFacade } from './../../session/session.facade';
import { CookieService } from 'ngx-cookie-service';
import { User } from './../../models/user.model';
import { ResponseObject } from './../../models/response-object.model';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Observable } from 'rxjs';
import { LoginState } from './state/login.state';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginFacade {
  constructor(
    private loginState: LoginState,
    private authenticationService: AuthenticationService,
    private sessionFacade: SessionFacade,
    // private cookieService: CookieService,
    private router: Router
  ) {}

  // getLoginUser$(): Observable<User> {
  //   return this.loginState.getLoginUser$();
  // }

  // isLoggedIn(): boolean {
  //   return this.loginState.isLoggedIn();
  // }

  error$(): Observable<string> {
    return this.loginState.getError$();
  }

  isLoading$(): Observable<boolean> {
    return this.loginState.getIsLoading$();
  }

  success$(): Observable<boolean> {
    return this.loginState.getSuccess$();
  }

  login(email: string, password: string): void {
    this.loginState.setIsLoading(true);

    this.authenticationService
      .login(email, password)
      .pipe(
        finalize(() => {
          this.loginState.setIsLoading(false);
        })
      )
      .subscribe(
        (response: ResponseObject) => {
          this.loginState.setSuccess(true);
          this.setSessionAndLogin(response);
        },
        (error) => {
          this.loginState.setError(error.message);
        }
      );
  }

  logout(): void {
    // this.sessionFacade.setToken('user');
    this.sessionFacade.setSession(null);
    this.router.navigateByUrl('/');
  }

  register(email: string, password: string): void {
    this.loginState.setIsLoading(true);

    this.authenticationService
      .register(email, password)
      .pipe(
        finalize(() => {
          this.loginState.setIsLoading(false);
        })
      )
      .subscribe(
        (response: ResponseObject) => {
          this.loginState.setSuccess(true);
          this.setSessionAndLogin(response);
        },
        (error) => {
          this.loginState.setError(error.message);
        }
      );
  }

  private setSessionAndLogin(response: ResponseObject): void {
    const session: Session = {
      token: response.token,
      user: response.data as User,
    };
    this.sessionFacade.setSession(session);
    this.router.navigateByUrl('/');
  }
}
