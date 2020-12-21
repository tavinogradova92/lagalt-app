import { ResponseObject } from './../models/response-object.model';
import { InterceptorSkipHeader } from './../utils/interceptorSkipHeader';
import { environment } from './../../environments/environment';
import { Industry } from './../models/industry.model';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IndustryService {
  private header = { headers: InterceptorSkipHeader };

  constructor(private http: HttpClient) {}

  getAllIndustries(): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(
      `${environment.api.baseUrl}industries`,
      this.header
    );
  }

  getIndustry(industryId: number): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(
      `${environment.api.baseUrl}industries/${industryId}`,
      this.header
    );
  }

  getIndustryByProject(id: number): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(
      `${environment.api.baseUrl}industries/project/${id}`,
      this.header
    );
  }

  getTopIndustries(): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(
      `${environment.api.baseUrl}industries/popular`,
      this.header
    );
  }
}
