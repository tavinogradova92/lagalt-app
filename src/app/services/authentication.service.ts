import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ResponseObject } from './../models/response-object.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';
import { User } from './../models/user.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = `${environment.api.baseUrl}`;
  private token: String;
  public readonly currentUser$: BehaviorSubject<User> = new BehaviorSubject<User>(
    {} as User
  );
  public readonly error$: BehaviorSubject<String> = new BehaviorSubject<String>(
    ''
  );

  public readonly userSubject$: BehaviorSubject<User>;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    const user = this.cookieService.get('user');
    this.userSubject$ = new BehaviorSubject<User>(
      user === '' ? null : JSON.parse(user)
    );
  }

  public get userValue(): User {
    return this.userSubject$.value;
  }

  login(email: String, password: String) {
    const body = { email, password };
    this.http
      .post<ResponseObject>(`${this.baseUrl}auth`, body)
      .pipe(
        map((response: ResponseObject) => {
          return response.data as User;
        })
      )
      .subscribe(
        (user: User) => {
          this.cookieService.set('user', JSON.stringify(user));
          this.userSubject$.next(user);
        },
        (error) => {
          this.error$.next(error.message);
        }
      );
  }

  register(email: String, password: String) {
    const body = { email, password };
    return this.http
      .post<ResponseObject>(`${this.baseUrl}registration`, body)
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
