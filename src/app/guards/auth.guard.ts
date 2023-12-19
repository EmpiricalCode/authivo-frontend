import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  
  const authService: AuthService = inject(AuthService);
  
  // Navigates to /login if user is not logged in 
  if (await authService.isLoggedIn()) {
    return true;
  }

  return authService.redirectWithParams("/login");
};
