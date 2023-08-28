import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authenticate/login/login.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ContinueComponent } from './authenticate/continue/continue.component';
import { authProviderGuard } from './auth-provider.guard';
import { authContinueGuard } from './auth-continue.guard';
import { authCredentialsGuard } from './auth-credentials.guard';
import { credentialsGuard } from './credentials.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { CreateComponent } from './dashboard/create/create.component';
import { ConfigureComponent } from './dashboard/configure/configure.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { TutorialsComponent } from './tutorials/tutorials.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "documentation",
    component: DocumentationComponent
  },
  {
    path: "tutorials",
    component: TutorialsComponent
  },
  {
    path: "settings",
    component: SettingsComponent,
    canActivate: [authGuard]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path: "dashboard/create",
    component: CreateComponent,
    canActivate: [authGuard]
  },
  {
    path: "dashboard/configure/:client_id",
    component: ConfigureComponent,
    canActivate: [authGuard]
  },
  {
    path: "dashboard/configure",
    redirectTo: "dashboard"
  },
  {
    path: "login",
    component: AuthenticateComponent,
    canActivate: [credentialsGuard]
  },
  {
    path: "register",
    component: AuthenticateComponent,
    canActivate: [credentialsGuard]
  },
  {
    path: "auth/login",
    component: AuthenticateComponent,
    canActivate: [authProviderGuard, authCredentialsGuard]
  },
  {
    path: "auth/register",
    component: AuthenticateComponent,
    canActivate: [authProviderGuard, authCredentialsGuard]
  },
  {
    path: "auth/continue",
    component: AuthenticateComponent,
    canActivate: [authProviderGuard, authContinueGuard]
  },
  {
    path: "auth",
    component: AuthenticateComponent,
    canActivate: [authProviderGuard]
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
