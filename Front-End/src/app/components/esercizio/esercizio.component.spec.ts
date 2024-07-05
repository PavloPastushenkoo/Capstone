import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsercizioComponent } from './esercizio.component';

describe('EsercizioComponent', () => {
  let component: EsercizioComponent;
  let fixture: ComponentFixture<EsercizioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EsercizioComponent]
    });
    fixture = TestBed.createComponent(EsercizioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
