import { Component } from '@angular/core';
import { SalaryModel } from './models/salary.model';
import { SalaryService } from './services/salary.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  calculationResult: SalaryModel | null = null;
  calculationHistory: SalaryModel[] = [];
  isProcessing = false;

  constructor(
    private salaryService: SalaryService,
    private snackBar: MatSnackBar
  ) {}

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
        this.notifyError('Failed to process salary calculation. Please try again.');
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
        this.notifyError('Failed to load salary history. Please refresh the page.');
      },
    });
  }

  notifyError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, 
      panelClass: 'error-snackbar',
    });
  }
}
