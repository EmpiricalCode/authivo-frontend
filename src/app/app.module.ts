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
import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

export default class CustomUrlSerializer implements UrlSerializer {
  private _defaultUrlSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

  parse(url: string): UrlTree {
      // Encode "+" to "%2B"
      url = url.replace(/\+/gi, '%2B');
      // Use the default serializer.
      return this._defaultUrlSerializer.parse(url);
  }

  serialize(tree: UrlTree): string {
      return this._defaultUrlSerializer.serialize(tree).replace(/\+/gi, '%2B');
  }
}

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
  providers: [{ provide: UrlSerializer, useClass: CustomUrlSerializer }],
  bootstrap: [AppComponent]
})
export class AppModule { }
