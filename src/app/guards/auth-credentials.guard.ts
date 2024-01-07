import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authCredentialsGuard: CanActivateFn = async (route, state) => {
  
  const authService: AuthService = inject(AuthService);

  // Redirects to /auth/continue if user is logged in
  if (!(await authService.isLoggedIn())) {
    return true;
  }

  return authService.redirectWithParams("/auth/continue");
};
