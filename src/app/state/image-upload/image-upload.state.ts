import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ImageUploadState {
  private readonly uploadedImageUrl$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );

  private readonly success$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  private readonly error$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  getUploadedImageUrl(): Observable<string> {
    return this.uploadedImageUrl$.asObservable();
  }

  getUploadedImageUrlValue(): string {
    return this.uploadedImageUrl$.value;
  }

  setUploadedImageUrl(url: string): void {
    this.uploadedImageUrl$.next(url);
  }

  getIsLoading$(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  setIsLoading(isLoading: boolean): void {
    this.isLoading$.next(isLoading);
  }

  setSuccess(success: boolean): void {
    this.success$.next(success);
  }

  getSuccess$(): Observable<boolean> {
    return this.success$.asObservable();
  }

  setError(error: string): void {
    this.error$.next(error);
  }

  getError$(): Observable<string> {
    return this.error$.asObservable();
  }
}
