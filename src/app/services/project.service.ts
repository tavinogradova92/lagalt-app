import { InterceptorSkipHeader } from './../utils/interceptorSkipHeader';
import { ResponseObject } from './../models/response-object.model';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl = `${environment.api.baseUrl}projects`;
  private header = { headers: InterceptorSkipHeader };

  constructor(private http: HttpClient) {}

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.baseUrl, this.header);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`, this.header);
  }

  getActiveProjectsFromUser(userId: number): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(
      `${this.baseUrl}/user/${userId}/active`
    );
  }

  getProjectsByIndustry(industryId: number): Observable<Project[]> {
    return this.http.get<Project[]>(
      `${this.baseUrl}/industry/${industryId}`,
      this.header
    );
  }

  getProjectsFromTag(tagId: number): Observable<ResponseObject> {
    return this.http.get<ResponseObject>(
      `${this.baseUrl}/tag/${tagId}`,
      this.header
    );
  }

  createProject(project: Project): Observable<any> {
    const headers = { headers: { 'content-type': 'application/json' } };
    const body = JSON.stringify(project);
    return this.http.post<Project>(`${this.baseUrl}`, body, headers).pipe(
      catchError((error) => {
        return of({ error });
      })
    );
  }
}
