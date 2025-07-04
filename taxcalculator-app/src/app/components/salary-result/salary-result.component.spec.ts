import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryResultComponent } from './salary-result.component';

describe('SalaryResultComponent', () => {
  let component: SalaryResultComponent;
  let fixture: ComponentFixture<SalaryResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaryResultComponent]
    });
    fixture = TestBed.createComponent(SalaryResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
