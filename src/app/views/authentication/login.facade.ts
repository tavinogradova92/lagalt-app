import { Session } from './../../models/session.model';
import { SessionFacade } from '../../state/session/session.facade';
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
    private router: Router
  ) {}

  error$(): Observable<string> {
    return this.loginState.getError$();
  }

  isLoadingValue(): boolean {
    return this.loginState.getIsLoadingValue();
  }

  resetError(): void {
    this.loginState.setError('');
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
          this.loginState.setIsLoading(false);
          this.loginState.setError(error);
        }
      );
  }

  logout(): void {
    this.sessionFacade.setSession(null);
    this.router.navigateByUrl('/');
  }

  checkIfEmailExists(email: string): void {
    this.loginState.setIsLoading(true);

    this.authenticationService
      .checkIfEmailExists(email)
      .pipe(
        finalize(() => {
          this.loginState.setIsLoading(false);
        })
      )
      .subscribe(
        (_) => {
          this.loginState.setSuccess(true);
        },
        (error) => {
          this.loginState.setIsLoading(false);
          this.loginState.setError(error);
        }
      );
  }

  register(user: User): void {
    this.loginState.setIsLoading(true);

    this.authenticationService
      .register(user)
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
          this.loginState.setIsLoading(false);
          this.loginState.setError(error);
        }
      );
  }

  private setSessionAndLogin(response: ResponseObject): void {
    const session: Session = {
      token: response.token,
      user: response.data as User,
    };
    this.sessionFacade.setSession(session);
  }
}
