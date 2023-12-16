import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authContinueGuard } from './auth-continue.guard';

describe('authContinueGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authContinueGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
