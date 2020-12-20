import { ImageUploadState } from './image-upload.state';
import { ImageUploadService } from './../../services/image-upload.service';
import { ResponseObject } from '../../models/response-object.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadFacade {
  constructor(
    private imageUploadState: ImageUploadState,
    private imageUploadService: ImageUploadService
  ) {}

  image$(): Observable<string> {
    return this.imageUploadState.getUploadedImageUrl();
  }

  uploadedImageUrl(): string {
    return this.imageUploadState.getUploadedImageUrlValue();
  }

  error$(): Observable<string> {
    return this.imageUploadState.getError$();
  }

  // isLoadingValue(): boolean {
  //   return this.imageUploadState.getIsLoadingValue();
  // }

  resetError(): void {
    this.imageUploadState.setError('');
  }

  isLoading$(): Observable<boolean> {
    return this.imageUploadState.getIsLoading$();
  }

  success$(): Observable<boolean> {
    return this.imageUploadState.getSuccess$();
  }

  uploadImage(image: File): void {
    this.imageUploadState.setIsLoading(true);

    this.imageUploadService
      .uploadImage(image)
      .pipe(
        finalize(() => {
          this.imageUploadState.setIsLoading(false);
          this.imageUploadState.setSuccess(null);
        })
      )
      .subscribe(
        (response: ResponseObject) => {
          this.imageUploadState.setUploadedImageUrl('' + response.data);
          this.imageUploadState.setSuccess(true);
        },
        (response) => {
          this.imageUploadState.setError(response.error);
        }
      );
  }
}
