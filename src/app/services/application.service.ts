import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) {
  }

  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${environment.api.baseUrl}applications`);
  }

  getApplication(applicationId: number): Observable<Application> {
    return this.http.get<Application>(`${environment.api.baseUrl}applications/${applicationId}`);
  }

  getApplicationsForProject(): Observable<Application[]> {
    return this.http.get<Application[]>(`${environment.api.baseUrl}applications/project/2`);
  }

  createApplication(application: Application): Observable<any> {
    const headers = { headers: { 'content-type': 'application/json' } };
    const body = JSON.stringify(application);
    return this.http.post<Application>(`${environment.api.baseUrl}applications`, body, headers).pipe(
      catchError(error => {
        return of({ error });
      })
    );
  }
}

