import { ProjectPreloadGuard } from '../../guards/preloads/project-preload.guard';
import { ProjectCreationContainer } from './project-creation/container/project-creation.container';
import { ProjectDetailsPageComponent } from './project-details-page/project-details-page.component';
import { ApplicationComponent } from './../application/application.component';
import { AuthGuard } from './../../guards/auth.guard';
import { ApplicationListComponent } from './../application-list/application-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'projects/:id',
    resolve: [ProjectPreloadGuard],
    component: ProjectDetailsPageComponent,
  },
  {
    path: 'projects/:id/apply',
    component: ApplicationComponent,
  },
  {
    path: 'create-project',
    component: ProjectCreationContainer,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/:id/applications',
    component: ApplicationListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
