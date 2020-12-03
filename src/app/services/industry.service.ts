import { environment } from './../../environments/environment';
import { Industry } from './../models/industry.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IndustryService {
  constructor(private http: HttpClient) {}

  // getAllIndustries(): Observable<Industry[]> {
  //   return this.http
  //     .get<Industry[]>(`${environment.api.baseUrl}${environment.api.baseUrl}`)
  //     .pipe(
  //       map((response: any) => {
  //         response.map((industry: any) => {
  //           const { id, name, image } = industry;
  //           return { id, name, image };
  //         });
  //       })
  //     );
  // }

  getAllIndustries(): Observable<Industry[]> {
    return this.http
      .get<Industry[]>(
        `${environment.api.baseUrl}${environment.api.industries}`
      )
      .pipe(
        map((response: any) =>
          response.map((industry: any) => {
            const { id, name, image } = industry;
            return {
              id,
              name,
              image,
            };
          })
        )
      );
  }
}
