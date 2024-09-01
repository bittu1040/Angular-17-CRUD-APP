import { TestBed } from '@angular/core/testing';

import { FirestoreDbService } from './firestore-db.service';

describe('FirestoreDbService', () => {
  let service: FirestoreDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
