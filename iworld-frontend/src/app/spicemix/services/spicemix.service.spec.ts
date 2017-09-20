import { TestBed, inject } from '@angular/core/testing';

import { SpicemixService } from './spicemix.service';

describe('SpicemixService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpicemixService]
    });
  });

  it('should be created', inject([SpicemixService], (service: SpicemixService) => {
    expect(service).toBeTruthy();
  }));
});
