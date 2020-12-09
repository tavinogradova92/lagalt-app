import { Observable } from 'rxjs';
import { ResponseObject } from './../models/response-object.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private baseUrl = `${environment.api.baseUrl}skills`;
  constructor(private http: HttpClient) {}

  getAllSkills(): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(this.baseUrl);
  }
}
