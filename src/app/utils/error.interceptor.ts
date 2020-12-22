import { Router } from '@angular/router';
import { InterceptorSkip } from './interceptorSkipHeader';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers && request.headers.has(InterceptorSkip)) {
      const headers = request.headers.delete(InterceptorSkip);
      return next.handle(request.clone({ headers }));
    }
    return next.handle(request).pipe(
      catchError((response) => {
        if ([403].indexOf(response.status) !== -1) {
          this.router.navigateByUrl('access-denied');
        }
        const error = response.error.error;
        return throwError(error);
      })
    );
  }
}
