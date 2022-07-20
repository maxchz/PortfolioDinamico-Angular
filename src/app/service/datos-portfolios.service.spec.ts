import { TestBed } from '@angular/core/testing';

import { DatosPortfoliosService } from './datos-portfolios.service';

describe('DatosPortfoliosService', () => {
  let service: DatosPortfoliosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosPortfoliosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
