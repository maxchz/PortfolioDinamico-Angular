import { TestBed } from '@angular/core/testing';

import { EnviarMensajeContactoService } from './enviar-mensaje-contacto.service';

describe('EnviarMensajeContactoService', () => {
  let service: EnviarMensajeContactoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarMensajeContactoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
