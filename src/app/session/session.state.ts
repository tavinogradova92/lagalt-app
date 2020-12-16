import { CookieService } from 'ngx-cookie-service';
import { Session } from './../models/session.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SessionState {
  private readonly session$: BehaviorSubject<Session> = new BehaviorSubject<Session>(
    null
  );

  constructor(private cookieService: CookieService) {
    if (!this.getSessionValue()) {
      const savedCookie = cookieService.get('session');
      if (savedCookie) {
        const cookieSession: Session = savedCookie && JSON.parse(savedCookie);
        this.setSession(cookieSession);
      }
    }
  }

  getSession$(): Observable<Session> {
    return this.session$.asObservable();
  }

  getSessionValue(): Session {
    return this.session$.value;
  }

  isLoggedIn(): boolean {
    return !!this.getSessionValue();
  }

  setSession(session: Session): void {
    if (session) {
      this.cookieService.set('session', JSON.stringify(session));
    } else {
      this.cookieService.delete('session');
    }
    this.session$.next(session);
  }
}
