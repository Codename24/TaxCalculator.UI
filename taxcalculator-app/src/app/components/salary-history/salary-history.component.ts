import { Component, Input } from '@angular/core';
import { SalaryModel } from 'src/app/models/salary.model';

@Component({
  selector: 'app-salary-history',
  templateUrl: './salary-history.component.html',
  styleUrls: ['./salary-history.component.css']
})
export class SalaryHistoryComponent {
 @Input() calculationsHistory: SalaryModel[] | null = null;
}
