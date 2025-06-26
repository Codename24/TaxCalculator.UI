import { Component } from '@angular/core';
import { SalaryModel } from './models/salary.model';
import { SalaryService } from './services/salary.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  calculationResult: SalaryModel | null = null;
  calculationHistory: SalaryModel[] = [];
  isProcessing = false;

  constructor(private salaryService: SalaryService) {}

  ngOnInit(): void {
    this.fetchHistoryDetails();
  }

   onCalculate(grossSalary: number): void {
    this.isProcessing = true;

    this.salaryService.calculateNetSalary(grossSalary).subscribe({
      next: (result: SalaryModel) => {
        this.calculationResult = result;
        this.fetchHistoryDetails();
        this.isProcessing = false;
      },
      error: (error) => {
        console.error('Failed to calculate salary:', error);
        this.isProcessing = false;
      },
    });
  }

  fetchHistoryDetails(): void {
    this.salaryService.getSalaryCalculationsHistory().subscribe({
      next: (history: SalaryModel[]) => {
        this.calculationHistory = history;
      },
      error: (error) => {
        console.error('Failed to fetch salary history:', error);
      },
    });
  }
}
