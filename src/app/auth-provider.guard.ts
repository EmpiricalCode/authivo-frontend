import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authProviderGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  
  if (!authService.getClientID() || !authService.getRedirectUri() || !authService.getAuthType()) {
    return router.navigate(['']);
  }

  if (authService.getAuthType() != "pkce" && authService.getAuthType() != "authentication_code") {
    return router.navigate(['']);
  }

  if (authService.getAuthType() == "pkce" && !authService.getCodeChallenge()) {
    return router.navigate(['']);
  }

  return true;
};
