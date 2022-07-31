import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaUsuarioDialogComponent } from './crea-usuario-dialog.component';

describe('CreaUsuarioDialogComponent', () => {
  let component: CreaUsuarioDialogComponent;
  let fixture: ComponentFixture<CreaUsuarioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreaUsuarioDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaUsuarioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
