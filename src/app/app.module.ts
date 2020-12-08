import { UserModule } from './views/user/user.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NotFoundPageComponent } from './error-handling/not-found-page/not-found-page.component';
import { TopIndustriesComponent } from './components/main-page/top-industries/top-industries.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginButtonComponent } from './utils/login-button/login-button.component';
import { RegisterButtonComponent } from './utils/register-button/register-button.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectsListComponent } from './components/main-page/projects-list/projects-list/projects-list.component';
import { ProjectDetailsPageComponent } from './components/project-details-page/project-details-page.component';
import { SearchBarComponent } from './utils/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NotFoundPageComponent,
    TopIndustriesComponent,
    NavbarComponent,
    LoginButtonComponent,
    RegisterButtonComponent,
    LoginComponent,
    ProjectsListComponent,
    ProjectDetailsPageComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    UserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
