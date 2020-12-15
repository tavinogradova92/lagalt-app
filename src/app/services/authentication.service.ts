import { CookieService } from 'ngx-cookie-service';
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

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    const user = this.cookieService.get('user');
    this.userSubject$ = new BehaviorSubject<User>(
      user === '' ? {} : JSON.parse(user)
    );
  }

  public get userValue(): User {
    return this.userSubject$.value;
  }

  login(email: String, password: String) {
    const body = { email, password };
    return this.http
      .post<ResponseObject>(`${this.baseUrl}/authenticate`, body)
      .pipe(
        map((response: ResponseObject) => {
          const user = response.data as User;
          this.cookieService.set('user', JSON.stringify(user));
          this.userSubject$.next(user);
          return user;
        })
      );
  }

  register(email: String, password: String) {
    const body = { email, password };
    return this.http
      .post<ResponseObject>(`${this.baseUrl}/registration`, body)
      .pipe(
        map((response: ResponseObject) => {
          const user = response.data as User;
          this.cookieService.set('user', JSON.stringify(user));
          this.userSubject$.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    this.cookieService.delete('user');
    this.userSubject$.next(null);
    this.router.navigateByUrl('/');
  }
}
