import { TestBed } from '@angular/core/testing';

import { FirebaseContactService } from './firebase-contact.service';

describe('FirebaseContactService', () => {
  let service: FirebaseContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
