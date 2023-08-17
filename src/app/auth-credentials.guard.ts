import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authCredentialsGuard: CanActivateFn = async (route, state) => {
  
  const authService: AuthService = inject(AuthService);

  if (!(await authService.isLoggedIn())) {
    return true;
  }

  return authService.redirectWithParams("/auth/continue");
};
