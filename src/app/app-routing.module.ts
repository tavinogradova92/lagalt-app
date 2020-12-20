import { AuthenticatedRedirectGuard } from './guards/AuthenticatedRedirect.guard';
import { AuthGuard } from './guards/auth.guard';
import { UserPreloadGuard } from './guards/user-preload.guard';
import { UserComponent } from './views/user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './views/main-page/main-page.component';
import { NotFoundPageComponent } from './error-handling/not-found-page/not-found-page.component';

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
    path: '',
    loadChildren: () =>
      import('./views/projects/projects.module').then((m) => m.ProjectsModule),
  },
  {
    path: 'users/:id',
    component: UserComponent,
    resolve: [UserPreloadGuard],
    canActivate: [AuthGuard],
  },
<<<<<<< HEAD
  {
    path: 'projects/:id',
    component: ProjectDetailsPageComponent,
  },
  {
    path: 'projects/:id/apply',
    component: ApplicationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create-project',
    component: ProjectCreationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects/:id/applications',
    component: ApplicationListComponent,
  },
=======
  // {
  //   path: 'projects/:id',
  //   component: ProjectDetailsPageComponent,
  // },
  // {
  //   path: 'projects/:id/apply',
  //   component: ApplicationComponent,
  // },
  // {
  //   path: 'create-project',
  //   component: ProjectCreationComponent,
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'projects/:id/applications',
  //   component: ApplicationListComponent,
  // },
>>>>>>> ae51034f45e1e6d231853385f8bff471e20c27ca
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
