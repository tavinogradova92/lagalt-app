import { ProjectService } from '../../services/project.service';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectPreloadGuard implements Resolve<any> {
  constructor(private router: Router, private projectService: ProjectService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | void {
    const id = Number(route.paramMap.get('id'));
    if (!isNaN(id)) {
      const observable = this.projectService.getProject(id).pipe(
        catchError((error) => {
          this.router.navigateByUrl('/not-found');
          return of({ error });
        })
      );
      return observable;
    }
    this.router.navigateByUrl('/not-found');
  }
}
