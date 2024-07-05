import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetagliFisiciComponent } from './detagli-fisici.component';

describe('DetagliFisiciComponent', () => {
  let component: DetagliFisiciComponent;
  let fixture: ComponentFixture<DetagliFisiciComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetagliFisiciComponent]
    });
    fixture = TestBed.createComponent(DetagliFisiciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
