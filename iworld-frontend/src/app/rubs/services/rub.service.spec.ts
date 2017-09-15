import { TestBed, inject } from '@angular/core/testing';

import { RubService } from './rub.service';

describe('RubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RubService]
    });
  });

  it('should be created', inject([RubService], (service: RubService) => {
    expect(service).toBeTruthy();
  }));
});
