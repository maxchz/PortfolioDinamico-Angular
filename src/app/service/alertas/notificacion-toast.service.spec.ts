import { TestBed } from '@angular/core/testing';

import { NotificacionToastService } from './notificacion-toast.service';

describe('NotificacionToastService', () => {
  let service: NotificacionToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificacionToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
