import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const credentialsGuard: CanActivateFn = async (route, state) => {
  
  const authService: AuthService = inject(AuthService);

  // Navigates to dashboard if user is logged in
  if (!(await authService.isLoggedIn())) {
    return true;
  }

  return authService.redirectWithParams("/dashboard");
};
