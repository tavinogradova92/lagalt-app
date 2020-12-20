import { User } from './../../models/user.model';
import { Session } from '../../models/session.model';
import { SessionState } from './session.state';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionFacade {
  constructor(private sessionState: SessionState) {}

  getSession(): Observable<Session> {
    return this.sessionState.getSession$();
  }

  setSession(session: Session): void {
    this.sessionState.setSession(session);
  }

  isLoggedIn(): boolean {
    return this.sessionState.isLoggedIn();
  }

  sessionValue(): Session {
    return this.sessionState.getSessionValue();
  }
}
