import { Injectable } from '@angular/core';
import { User } from './../../../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginState {
  private readonly currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(
    null
  );
  success$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  private readonly error$: BehaviorSubject<String> = new BehaviorSubject<String>(
    null
  );

  public getCurrentUser$(): Observable<User> {
    return this.currentUser$.asObservable();
  }

  public setCurrentUser(user: User): void {
    this.currentUser$.next(user);
  }

  setSuccess(success: boolean): void {
    this.success$.next(success);
  }

  getSuccess$(): Observable<boolean> {
    return this.success$.asObservable();
  }

  public getError$(): Observable<String> {
    return this.error$.asObservable();
  }

  public setError(error: String): void {
    this.error$.next(error);
  }
}
