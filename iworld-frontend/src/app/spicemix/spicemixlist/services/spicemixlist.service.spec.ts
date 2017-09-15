import { TestBed, inject } from '@angular/core/testing';

import { SpicemixlistService } from './spicemixlist.service';

describe('SpicemixlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpicemixlistService]
    });
  });

  it('should be created', inject([SpicemixlistService], (service: SpicemixlistService) => {
    expect(service).toBeTruthy();
  }));
});
