import { TestBed } from '@angular/core/testing';

import { InitConfigService } from './init-config.service';

describe('InitConfigService', () => {
  let service: InitConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
