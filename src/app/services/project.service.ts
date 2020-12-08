import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${environment.api.baseUrl}${environment.api.projects}`);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${environment.api.baseUrl}${environment.api.projects}/${id}`);
  }

}

