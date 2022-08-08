import { TestBed } from '@angular/core/testing';

import { ModificaDataPersonaService } from './modifica-data-persona.service';

describe('ModificaDataPersonaService', () => {
  let service: ModificaDataPersonaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModificaDataPersonaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
