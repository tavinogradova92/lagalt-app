import { ResponseObject } from './../models/response-object.model';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';
import { User } from './../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = `${environment.api.baseUrl}users`;
  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(`${this.baseUrl}/${id}`);
  }

  updateUser(user: User): Observable<any> {
    const headers = { headers: { 'content-type': 'application/json' } };
    const body = JSON.stringify(user);
    return this.http
      .patch<User>(`${this.baseUrl}/${user.id}`, body, headers)
      .pipe(
        catchError((error) => {
          return of({ error });
        })
      );
  }
}
