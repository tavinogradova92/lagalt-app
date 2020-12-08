import { environment } from './../../environments/environment';
import { Industry } from './../models/industry.model';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IndustryService {
  constructor(private http: HttpClient) {}

  getAllIndustries(): Observable<Industry[]> {
    return this.http.get<Industry[]>(`${environment.api.baseUrl}${environment.api.industries}`);
  }

  getIndustry(industryId: number): Observable<Industry> {
    return this.http.get<Industry>(`${environment.api.baseUrl}${environment.api.industries}/${industryId}`);
  }

  getIndustryByProject(id: number): Observable<Industry> {
    return this.http.get<Industry>(`${environment.api.baseUrl}${environment.api.industries}/project/${id}`);
  }
}
