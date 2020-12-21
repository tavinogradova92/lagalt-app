import { ProjectsPreloadGuard } from './guards/preloads/projects-preload.guard';
import { AuthenticatedRedirectGuard } from './guards/AuthenticatedRedirect.guard';
import { AuthGuard } from './guards/auth.guard';
import { UserPreloadGuard } from './guards/preloads/user-preload.guard';
import { UserComponent } from './views/user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './views/main-page/main-page.component';
import { NotFoundPageComponent } from './error-handling/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    resolve: [ProjectsPreloadGuard],
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
