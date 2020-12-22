import { ImageUploadFacade } from './../../../../state/image-upload/image-upload.facade';
import { Project } from './../../../../models/project.model';
import { ProjectFacade } from './../../projects.facade';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
    <app-project-creation
      (uploadImage)="uploadImage($event)"
      (createProject)="createProject($event)"
      (projectCreated)="handleCreatedSuccess()"
    ></app-project-creation>
  `,
})
export class ProjectCreationContainer {
  constructor(
    private projectFacade: ProjectFacade,
    private imageUploadFacade: ImageUploadFacade,
    private router: Router
  ) {}

  uploadImage(image: File): void {
    this.imageUploadFacade.uploadImage(image);
  }

  createProject(project: Project): void {
    this.projectFacade.createProject(project);
    window.alert('The project has been created!');
    this.router.navigateByUrl('/');
  }

  handleCreatedSuccess(): void {
    this.router.navigateByUrl('/');
  }
}
