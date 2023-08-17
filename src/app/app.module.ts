import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authenticate/login/login.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { RegisterComponent } from './authenticate/register/register.component';
import { ContinueComponent } from './authenticate/continue/continue.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './dashboard/create/create.component';
import { ConfigureComponent } from './dashboard/configure/configure.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AuthenticateComponent,
    RegisterComponent,
    ContinueComponent,
    DashboardComponent,
    CreateComponent,
    ConfigureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
