import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${environment.api.baseUrl}project-images`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    console.log(req);
    return this.http.request(req);
  }

  getProjectImage(id: number): Observable<any> {
    return this.http.get(`${environment.api.baseUrl}project-images/storage/` + id);
  }
}
