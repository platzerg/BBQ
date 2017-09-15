import { TestBed, inject } from '@angular/core/testing';

import { SpicelistService } from './spicelist.service';

describe('SpicelistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpicelistService]
    });
  });

  it('should be created', inject([SpicelistService], (service: SpicelistService) => {
    expect(service).toBeTruthy();
  }));
});
