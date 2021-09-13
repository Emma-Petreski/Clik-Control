import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {AuthService} from "./shared/services/auth.service";
import {DataService} from "./shared/services/data.service";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TravellersComponent } from './travellers/travellers.component';
import { NavbarComponent } from './navbar/navbar.component';
import {ErrorsInterceptor} from "./shared/interceptor/errors.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    TravellersComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    AuthService,
    DataService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorsInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
