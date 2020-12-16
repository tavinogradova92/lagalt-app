import { Injectable } from '@angular/core';
import { User } from './../../../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginState {
  private readonly success$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  private readonly error$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private readonly loginUser$: BehaviorSubject<User> = new BehaviorSubject<User>(
    null
  );
  private readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  getIsLoading$(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  setIsLoading(isLoading: boolean): void {
    this.isLoading$.next(isLoading);
  }

  getLoginUser$(): Observable<User> {
    return this.loginUser$.asObservable();
  }

  isLoggedIn(): boolean {
    return !!this.loginUser$.value;
  }

  setLoginUser(user: User): void {
    this.loginUser$.next(user);
  }

  setSuccess(success: boolean): void {
    this.success$.next(success);
  }

  getSuccess$(): Observable<boolean> {
    return this.success$.asObservable();
  }

  setError(error: string): void {
    this.error$.next(error);
  }

  getError$(): Observable<string> {
    return this.error$.asObservable();
  }
}
