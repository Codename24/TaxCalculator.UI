import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SalaryInputComponent } from './salary-input.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SalaryInputComponent', () => {
  let component: SalaryInputComponent;
  let fixture: ComponentFixture<SalaryInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalaryInputComponent],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        BrowserAnimationsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SalaryInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.salaryForm.value.grossSalary).toBeNull();
    expect(component.salaryForm.valid).toBe(false);
  });

  it('should emit grossSalary on calculate when the form is valid', () => {
    spyOn(component.calculate, 'emit');

    component.salaryForm.setValue({ grossSalary: 5000 });
    component.onCalculate();

    expect(component.calculate.emit).toHaveBeenCalledWith(5000);
  });

  it('should not emit grossSalary on calculate when the form is invalid', () => {
    spyOn(component.calculate, 'emit');

    component.salaryForm.setValue({ grossSalary: null });
    component.onCalculate();

    expect(component.calculate.emit).not.toHaveBeenCalled();
  });

  it('should set isProcessing to true initially and false after timeout', fakeAsync(() => {
    component.salaryForm.setValue({ grossSalary: 5000 });
    component.onCalculate();

    expect(component.isProcessing).toBeTrue();

    tick(2000);

    expect(component.isProcessing).toBeFalse();
  }));

  it('should not process if salary is less than 1', () => {
    component.salaryForm.setValue({ grossSalary: 0 });
    component.onCalculate();

    expect(component.salaryForm.valid).toBeFalse();
    expect(component.isProcessing).toBeFalse();
  });
});
