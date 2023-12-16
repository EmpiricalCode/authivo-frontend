import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authCredentialsGuard } from './auth-credentials.guard';

describe('authCredentialsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authCredentialsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
