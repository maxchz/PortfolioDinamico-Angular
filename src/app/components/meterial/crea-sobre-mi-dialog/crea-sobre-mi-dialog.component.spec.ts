import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaSobreMiDialogComponent } from './crea-sobre-mi-dialog.component';

describe('CreaSobreMiDialogComponent', () => {
  let component: CreaSobreMiDialogComponent;
  let fixture: ComponentFixture<CreaSobreMiDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreaSobreMiDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaSobreMiDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
