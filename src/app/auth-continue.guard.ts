import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authContinueGuard: CanActivateFn = (route, state) => {
  
  const authService: AuthService = inject(AuthService);

  if (authService.isLoggedIn()) {
    return true;
  }

  return authService.redirectWithParams("/auth/login");
};
