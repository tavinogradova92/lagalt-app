import { ResponseObject } from './../models/response-object.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private baseUrl = `${environment.api.baseUrl}`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<ResponseObject> {
    const body = { email, password };
    return this.http.post<ResponseObject>(`${this.baseUrl}auth`, body);
  }

  register(email: string, password: string): Observable<ResponseObject> {
    const body = { email, password };
    return this.http.post<ResponseObject>(`${this.baseUrl}registration`, body);
  }
}
