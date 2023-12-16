import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authenticate/login/login.component';
import { AuthenticateComponent } from './components/authenticate/authenticate.component';
import { ContinueComponent } from './components/authenticate/continue/continue.component';
import { authProviderGuard } from './guards/auth-provider.guard';
import { authContinueGuard } from './guards/auth-continue.guard';
import { authCredentialsGuard } from './guards/auth-credentials.guard';
import { credentialsGuard } from './guards/credentials.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { CreateComponent } from './components/dashboard/create/create.component';
import { ConfigureComponent } from './components/dashboard/configure/configure.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { TutorialsComponent } from './components/tutorials/tutorials.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SettingsComponent } from './components/settings/settings.component';

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
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
