import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authProviderGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  
  if (authService.getClientID() && authService.getRedirectUri() && authService.getAuthType()) {
    return true;
  }

  return router.navigate(['']);
};
