import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authenticate/login/login.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { ContinueComponent } from './authenticate/continue/continue.component';
import { authProviderGuard } from './auth-provider.guard';
import { authContinueGuard } from './auth-continue.guard';
import { authCredentialsGuard } from './auth-credentials.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "login",
    component: AuthenticateComponent
  },
  {
    path: "register",
    component: AuthenticateComponent
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
