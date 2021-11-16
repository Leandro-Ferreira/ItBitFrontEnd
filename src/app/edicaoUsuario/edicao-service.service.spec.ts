import { TestBed } from '@angular/core/testing';

import { EdicaoServiceService } from './edicao-service.service';

describe('EdicaoServiceService', () => {
  let service: EdicaoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdicaoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
