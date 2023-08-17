import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { credentialsGuard } from './credentials.guard';

describe('credentialsGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => credentialsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
