import { Observable } from 'rxjs';
import { LoginState } from './state/login.state';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginFacade {
  constructor(private loginState: LoginState) {}

  public success$(): Observable<boolean> {
    return this.loginState.getSuccess$();
  }
}
