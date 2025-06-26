import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { delay } from 'rxjs';

@Component({
  selector: 'app-salary-input',
  templateUrl: './salary-input.component.html',
  styleUrls: ['./salary-input.component.css']
})
export class SalaryInputComponent {
  @Output() calculate = new EventEmitter<number>();
  salaryForm: FormGroup;
  isProcessing = false;

  constructor(private fb: FormBuilder) {
    this.salaryForm = this.fb.group({
      grossSalary: [null, [Validators.required, Validators.min(0)]],
    });
  }

  onCalculate() {
    if (this.salaryForm.valid) {
      this.isProcessing = true;
      const grossSalary = this.salaryForm.value.grossSalary;
      this.calculate.emit(grossSalary);

      setTimeout(() => {
        this.isProcessing = false;
      }, 2000);

    }
  }
}
