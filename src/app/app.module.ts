import { AccessDeniedComponent } from './error-handling/access-denied/access-denied-page.component';
import { ErrorInterceptor } from './utils/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './views/authentication/login.module';
import { SessionModule } from './state/session/session.module';
import { JwtInterceptor } from './utils/jwt.interceptor';
import { FormsModule } from '@angular/forms';
import { MainPageModule } from './views/main-page/main-page.module';
import { UserModule } from './views/user/user.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedComponentsModule } from './components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainPageComponent } from './views/main-page/main-page.component';
import { NotFoundPageComponent } from './error-handling/not-found-page/not-found-page.component';
import { TopIndustriesComponent } from './components/top-industries/top-industries.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { RegisterButtonComponent } from './components/register-button/register-button.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './pipes/filter.pipe';
import { CookieService } from 'ngx-cookie-service';
import { ApplicationListComponent } from './views/application-list/application-list.component';
import { ApplicationComponent } from './views/application/application.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NotFoundPageComponent,
    AccessDeniedComponent,
    TopIndustriesComponent,
    NavbarComponent,
    LoginButtonComponent,
    RegisterButtonComponent,
    SearchBarComponent,
    FilterPipe,
    ApplicationListComponent,
    ApplicationComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    UserModule,
    MainPageModule,
    SharedComponentsModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    SessionModule,
    LoginModule,
    BrowserAnimationsModule,
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
