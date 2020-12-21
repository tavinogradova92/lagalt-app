import { ProjectService } from './../../services/project.service';
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
export class ProjectsPreloadGuard implements Resolve<any> {
  constructor(private projectService: ProjectService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | void {
    const observable = this.projectService.getAllProjects().pipe(
      catchError((error) => {
        return of({ error });
      })
    );
    return observable;
  }
}
