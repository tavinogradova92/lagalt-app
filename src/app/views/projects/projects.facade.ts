import { User } from './../../models/user.model';
import { SessionFacade } from './../../state/session/session.facade';
import { Project } from './../../models/project.model';
import { ProjectService } from './../../services/project.service';
import { ProjectState } from './state/projects.state';
import { ResponseObject } from '../../models/response-object.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProjectFacade {
  constructor(
    private projectState: ProjectState,
    private projectService: ProjectService,
    private sessionFacade: SessionFacade
  ) {}

  currentProject$(): Observable<Project> {
    return this.projectState.getcurrentProject$();
  }

  setProject(project: Project): void {
    this.projectState.setCurrentProject(project);
  }

  error$(): Observable<string> {
    return this.projectState.getError$();
  }

  isLoadingValue(): boolean {
    return this.projectState.getIsLoadingValue();
  }

  resetError(): void {
    this.projectState.setError('');
  }

  isLoading$(): Observable<boolean> {
    return this.projectState.getIsLoading$();
  }

  success$(): Observable<boolean> {
    return this.projectState.getSuccess$();
  }

  getProject(projectId: number): void {
    this.projectState.setIsLoading(true);

    this.projectService
      .getProject(projectId)
      .pipe(
        finalize(() => {
          this.projectState.setIsLoading(false);
          this.projectState.setSuccess(null);
        })
      )
      .subscribe(
        (response: ResponseObject) => {
          this.projectState.setSuccess(true);
          this.projectState.setCurrentProject(response.data as Project);
        },
        ({ error: response }) => {
          this.projectState.setIsLoading(false);
          this.projectState.setError(response.error);
        }
      );
  }

  createProject(project: Project): void {
    this.projectState.setIsLoading(true);
    const owner: User = this.sessionFacade.sessionValue().user;
    project.projectOwners = [owner];

    this.projectService
      .createProject(project)
      .pipe(
        finalize(() => {
          this.projectState.setIsLoading(false);
          this.projectState.setSuccess(null);
        })
      )
      .subscribe(
        (_) => {
          this.projectState.setSuccess(true);
        },
        ({ error: response }) => {
          this.projectState.setIsLoading(false);
          this.projectState.setError(response.error);
        }
      );
  }
}
