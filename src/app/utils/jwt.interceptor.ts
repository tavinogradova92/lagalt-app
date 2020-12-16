import { SessionFacade } from './../session/session.facade';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private sessionFacade: SessionFacade) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token =
      this.sessionFacade.isLoggedIn() &&
      this.sessionFacade.sessionValue().token;
    const isApiUrl = request.url.startsWith(environment.api.baseUrl);
    if (this.sessionFacade.isLoggedIn() && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
