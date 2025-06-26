import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalaryHistoryComponent } from './salary-history.component';
import { SalaryModel } from 'src/app/models/salary.model';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('SalaryHistoryComponent', () => {
  let component: SalaryHistoryComponent;
  let fixture: ComponentFixture<SalaryHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalaryHistoryComponent],
      imports: [
        MatCardModule,
        MatTableModule,
        BrowserAnimationsModule, // Required for Material animations
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SalaryHistoryComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title "Salary Calculations History"', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const title = compiled.querySelector('mat-card-title')?.textContent;
    expect(title).toBe('Salary Calculations History');
  });

  it('should display "No history available." when calculationsHistory is null', () => {
    component.calculationsHistory = null;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const noHistoryMessage = compiled.querySelector('p')?.textContent;
    expect(noHistoryMessage).toBe('No history available.');
  });

  it('should display "No history available." when calculationsHistory is empty', () => {
    component.calculationsHistory = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    const noHistoryMessage = compiled.querySelector('p')?.textContent;
    expect(noHistoryMessage).toBe('No history available.');
  });
});