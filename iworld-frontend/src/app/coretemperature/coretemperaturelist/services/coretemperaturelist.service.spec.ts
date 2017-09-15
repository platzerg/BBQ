import { TestBed, inject } from '@angular/core/testing';

import { CoretemperaturelistService } from './coretemperaturelist.service';

describe('CoretemperaturelistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoretemperaturelistService]
    });
  });

  it('should be created', inject([CoretemperaturelistService], (service: CoretemperaturelistService) => {
    expect(service).toBeTruthy();
  }));
});
