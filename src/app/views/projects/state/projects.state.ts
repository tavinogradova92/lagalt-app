import { Project } from './../../../models/project.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProjectState {
  private readonly currentProject$: BehaviorSubject<Project> = new BehaviorSubject<Project>(
    null
  );

  private readonly allProjects$: BehaviorSubject<
    Project[]
  > = new BehaviorSubject<Project[]>([]);

  private readonly success$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  private readonly error$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ''
  );
  private readonly isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  getcurrentProject$(): Observable<Project> {
    return this.currentProject$.asObservable();
  }

  setCurrentProject(project: Project): void {
    this.currentProject$.next(project);
  }

  getProjects$(): Observable<Project[]> {
    return this.allProjects$.asObservable();
  }

  setAllProjects(projects: Project[]): void {
    this.allProjects$.next(projects);
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

  getIsLoadingValue(): boolean {
    return this.isLoading$.value;
  }
}
