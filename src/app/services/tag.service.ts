import { InterceptorSkipHeader } from './../utils/interceptorSkipHeader';
import { Observable } from 'rxjs';
import { ResponseObject } from './../models/response-object.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private baseUrl = `${environment.api.baseUrl}tags/`;
  private header = { headers: InterceptorSkipHeader };

  constructor(private http: HttpClient) {}

  getPopularTags(): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(`${this.baseUrl}popular`, this.header);
  }
}
