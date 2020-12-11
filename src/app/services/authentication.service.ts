import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ResponseObject } from './../models/response-object.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = `${environment.api.baseUrl}users`;
  public readonly currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(
    {} as User
  );

  public readonly userSubject$: BehaviorSubject<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.userSubject$ = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('user'))
    );
  }

  public get userValue(): User {
    return this.userSubject$.value;
  }

  login(email: String) {
    return this.http
      .post<ResponseObject>(`${this.baseUrl}/authenticate`, email)
      .pipe(
        map((response: ResponseObject) => {
          const user = response.data as User;
          // console.log(user);
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject$.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject$.next(null);
    this.router.navigateByUrl('/');
  }
}
