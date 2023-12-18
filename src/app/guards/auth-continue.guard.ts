import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authContinueGuard: CanActivateFn = async (route, state) => {
  
  const authService: AuthService = inject(AuthService);

  if (await authService.isLoggedIn()) {
    return true;
  }

  return authService.redirectWithParams("/auth/login");
};
