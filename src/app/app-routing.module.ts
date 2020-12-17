import { AuthenticatedRedirectGuard } from './guards/AuthenticatedRedirect.guard';
import { AuthGuard } from './guards/auth.guard';
import { UserPreloadGuard } from './guards/user-preload.guard';
import { UserComponent } from './views/user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './views/main-page/main-page.component';
import { NotFoundPageComponent } from './error-handling/not-found-page/not-found-page.component';
import { ProjectDetailsPageComponent } from './views/project-details-page/project-details-page.component';
import { ApplicationComponent } from './views/application/application.component';
import { ProjectCreationComponent } from './views/project-creation/project-creation.component';
import { ApplicationListComponent } from './views/application-list/application-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: '',
    loadChildren: () =>
      import('./views/authentication/login.module').then((m) => m.LoginModule),
    canActivate: [AuthenticatedRedirectGuard],
  },
  {
    path: 'users/:id',
    component: UserComponent,
    resolve: [UserPreloadGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'projects/:id',
    component: ProjectDetailsPageComponent,
  },
  {
    path: 'projects/:id/apply',
    component: ApplicationComponent,
  },
  {
    path: 'create-project',
    component: ProjectCreationComponent,
  },
  {
    path: 'projects/:id/applications',
    component: ApplicationListComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
