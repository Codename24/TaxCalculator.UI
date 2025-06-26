import { Component, Input } from '@angular/core';
import { SalaryModel } from 'src/app/models/salary.model';

@Component({
  selector: 'app-salary-result',
  templateUrl: './salary-result.component.html',
  styleUrls: ['./salary-result.component.css']
})
export class SalaryResultComponent {
  @Input() calculationResult: SalaryModel | null = null;
}
