import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authCredentialsGuard: CanActivateFn = (route, state) => {
  
  const authService: AuthService = inject(AuthService);

  if (!authService.isLoggedIn()) {
    return true;
  }

  return authService.redirectWithParams("/auth/continue");
};
