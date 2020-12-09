import { MainPageModule } from './views/main-page/main-page.module';
import { UserModule } from './views/user/user.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { NotFoundPageComponent } from './error-handling/not-found-page/not-found-page.component';
import { TopIndustriesComponent } from './components/top-industries/top-industries.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { RegisterButtonComponent } from './components/register-button/register-button.component';
import { LoginComponent } from './views/login/login.component';
import { ProjectDetailsPageComponent } from './views/project-details-page/project-details-page.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ProjectSimpleComponent } from './components/project-simple/project-simple.component';
import { ApplicationComponent } from './views/application/application.component';

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
    ProjectDetailsPageComponent,
    SearchBarComponent,
    ProjectSimpleComponent,
    ApplicationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    UserModule,
    MainPageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
