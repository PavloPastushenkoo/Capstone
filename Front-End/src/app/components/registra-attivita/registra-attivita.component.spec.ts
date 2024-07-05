import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraAttivitaComponent } from './registra-attivita.component';

describe('RegistraAttivitaComponent', () => {
  let component: RegistraAttivitaComponent;
  let fixture: ComponentFixture<RegistraAttivitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistraAttivitaComponent]
    });
    fixture = TestBed.createComponent(RegistraAttivitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
