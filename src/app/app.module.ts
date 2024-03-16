import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authenticate/login/login.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { RegisterComponent } from './components/authenticate/register/register.component';
import { ContinueComponent } from './components/authenticate/continue/continue.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateComponent } from './components/dashboard/create/create.component';
import { ConfigureComponent } from './components/dashboard/configure/configure.component';
import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import { MarkdownModule } from 'ngx-markdown';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageTitleContainerComponent } from './utility-components/page-title-container/page-title-container.component';
import { ButtonLoadingComponent } from './utility-components/button-loading/button-loading.component';

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
    ConfigureComponent,
    DocumentationComponent,
    TutorialsComponent,
    PageNotFoundComponent,
    SettingsComponent,
    PageTitleContainerComponent,
    ButtonLoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    { 
      provide: UrlSerializer, useClass: CustomUrlSerializer 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
