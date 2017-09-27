import { TestBed, inject } from '@angular/core/testing';

import { RubResolver } from './rub-resolver.service';

describe('RubResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RubResolver]
    });
  });

  it('should be created', inject([RubResolver], (service: RubResolver) => {
    expect(service).toBeTruthy();
  }));
});
