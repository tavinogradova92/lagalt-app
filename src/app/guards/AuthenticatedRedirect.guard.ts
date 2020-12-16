import { SessionFacade } from '../session/session.facade';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedRedirectGuard implements CanActivate {
  constructor(private sessionFacade: SessionFacade, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isLoggedIn = this.sessionFacade.isLoggedIn();
    if (isLoggedIn) {
      this.router.navigateByUrl('/');
    }
    return !isLoggedIn;
  }
}
