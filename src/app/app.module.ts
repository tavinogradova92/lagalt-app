import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { NotFoundPageComponent } from './error-handling/not-found-page/not-found-page.component';
import { TopIndustriesComponent } from './components/main-page/top-industries/top-industries.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NotFoundPageComponent,
    TopIndustriesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
