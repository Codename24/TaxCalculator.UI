import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SalaryService } from './services/salary.service';
import { of, throwError } from 'rxjs';
import { SalaryModel } from './models/salary.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { SalaryResultComponent } from './components/salary-result/salary-result.component';
import { SalaryHistoryComponent } from './components/salary-history/salary-history.component';
import { SalaryInputComponent } from './components/salary-input/salary-input.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockSalaryService: SalaryService;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>

  beforeEach(async () => {
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        SalaryResultComponent,
        SalaryHistoryComponent,
        SalaryInputComponent,
      ],
      providers: [
        { provide: SalaryService, useClass: MockSalaryService },
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
      imports: [
        MatToolbarModule,
        MatCardModule,        
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatProgressBarModule,
        MatSnackBarModule
      ],
    }).compileComponents();

    // Create the component fixture
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockSalaryService = TestBed.inject(SalaryService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('onCalculate()', () => {
    it('should calculate net salary and update calculationResult', () => {
      const grossAnnualSalary = 144000;
      component.onCalculate(grossAnnualSalary);

      expect(component.isProcessing).toBeFalse();
      expect(component.calculationResult).toEqual({
        grossAnnualSalary,
        grossMonthlySalary: 12000,
        netAnnualSalary: 108000,
        netMonthlySalary: 9000,
        totalTax: 36000,
        totalMonthlyTaxes: 3000,
      });
    });

    it('should log error if calculateNetSalary fails', () => {
      spyOn(mockSalaryService, 'calculateNetSalary').and.returnValue(
        throwError('Calculation failed')
      );
    
      component.onCalculate(15000);

      expect(component.isProcessing).toBeFalse();
      expect(component.calculationResult).toBeNull();
      expect(mockSnackBar.open).toHaveBeenCalledWith(
        'Failed to process salary calculation. Please try again.',
        'Close',
        { duration: 5000, panelClass: 'error-snackbar' }
      );
    });
  });

  describe('fetchHistoryDetails()', () => {
    it('should fetch salary history and update calculationHistory', () => {
      component.fetchHistoryDetails();

      expect(component.calculationHistory).toEqual([
        {
          grossAnnualSalary: 120000,
          grossMonthlySalary: 10000,
          netAnnualSalary: 90000,
          netMonthlySalary: 7500,
          totalTax: 30000,
          totalMonthlyTaxes: 2500,
        },
        {
          grossAnnualSalary: 60000,
          grossMonthlySalary: 5000,
          netAnnualSalary: 45000,
          netMonthlySalary: 3750,
          totalTax: 15000,
          totalMonthlyTaxes: 1250,
        },
      ]);
    });

    it('should log error if getSalaryCalculationsHistory fails', () => {
      spyOn(mockSalaryService, 'getSalaryCalculationsHistory').and.returnValue(
        throwError('History fetch failed')
      );

      component.fetchHistoryDetails();

      expect(component.calculationHistory).toEqual([]);
      expect(mockSnackBar.open).toHaveBeenCalledWith(
        'Failed to load salary history. Please refresh the page.',
        'Close',
        { duration: 5000, panelClass: 'error-snackbar' }
      );
    });
  });

  describe('ngOnInit()', () => {
    it('should call fetchHistoryDetails on initialization', () => {
      spyOn(component, 'fetchHistoryDetails');
      component.ngOnInit();

      expect(component.fetchHistoryDetails).toHaveBeenCalled();
    });
  });
});
class MockSalaryService {
  calculateNetSalary(grossAnnualSalary: number) {
    const simulatedResult: SalaryModel = {
      grossAnnualSalary,
      grossMonthlySalary: grossAnnualSalary / 12, 
      netAnnualSalary: grossAnnualSalary * 0.75, 
      netMonthlySalary: (grossAnnualSalary * 0.75) / 12,
      totalTax: grossAnnualSalary * 0.25, 
      totalMonthlyTaxes: (grossAnnualSalary * 0.25) / 12,
    };
    return of(simulatedResult);
  }

  getSalaryCalculationsHistory() {
    const history: SalaryModel[] = [
      {
        grossAnnualSalary: 120000,
        grossMonthlySalary: 10000,
        netAnnualSalary: 90000,
        netMonthlySalary: 7500,
        totalTax: 30000,
        totalMonthlyTaxes: 2500,
      },
      {
        grossAnnualSalary: 60000,
        grossMonthlySalary: 5000,
        netAnnualSalary: 45000,
        netMonthlySalary: 3750,
        totalTax: 15000,
        totalMonthlyTaxes: 1250,
      },
    ];
    return of(history);
  }
}
