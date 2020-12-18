import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    console.log(formData);
    return this.http.post(
      `${environment.api.baseUrl}upload-images`,
      formData,
      {
        reportProgress: true,
        responseType: 'text'
      }
    );
  }
}
