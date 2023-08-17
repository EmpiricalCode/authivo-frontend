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

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
