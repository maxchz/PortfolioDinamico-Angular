import { TestBed } from '@angular/core/testing';

import { EliminarDatosPortfolioService } from './eliminar-datos-portfolio.service';

describe('EliminarDatosPortfolioService', () => {
  let service: EliminarDatosPortfolioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EliminarDatosPortfolioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
