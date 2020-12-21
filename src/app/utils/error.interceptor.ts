import { InterceptorSkip } from './interceptorSkipHeader';
import { LoginFacade } from '../views/authentication/login.facade';
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
  constructor(private loginFacade: LoginFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.headers && request.headers.has(InterceptorSkip)) {
      const headers = request.headers.delete(InterceptorSkip);
      return next.handle(request.clone({ headers }));
    }
    return next.handle(request).pipe(
      catchError((err) => {
        if ([401, 403].indexOf(err.status) !== -1) {
          this.loginFacade.logout();
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
