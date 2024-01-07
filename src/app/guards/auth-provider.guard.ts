import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authProviderGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  
  // Navigates to home if client_id, redirect_uri, and auth_type are not given
  if (!authService.getClientID() || !authService.getRedirectUri() || !authService.getAuthType()) {
    return router.navigate(['']);
  }

  // Navigates to home if improper auth type is given
  if (authService.getAuthType() != "pkce" && authService.getAuthType() != "authentication_code") {
    return router.navigate(['']);
  }

  // Navigates to home if not given code challenge and auth_type is "pkce"
  if (authService.getAuthType() == "pkce" && !authService.getCodeChallenge()) {
    return router.navigate(['']);
  }

  return true;
};
