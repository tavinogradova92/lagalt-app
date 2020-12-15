import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './guards/auth-guard.guard';
import { UserPreloadGuard } from './guards/user-preload.guard';
import { UserComponent } from './views/user/user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginContainer } from './views/login/containers/login.container';
import { MainPageComponent } from './views/main-page/main-page.component';
import { NotFoundPageComponent } from './error-handling/not-found-page/not-found-page.component';
import { ProjectDetailsPageComponent } from './views/project-details-page/project-details-page.component';
import { ApplicationComponent } from './views/application/application.component';
import { ProjectCreationComponent } from './views/project-creation/project-creation.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: 'login',
    component: LoginContainer,
  },
  {
    path: 'register',
    component: RegisterComponent,
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
    path: '**',
    component: NotFoundPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
