import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environments/environment';

import { SalaryService } from './salary.service';
import { SalaryModel } from '../models/salary.model';



// Mock environment
const mockEnvironment = {
  apiUrl: 'https://api-mock/api'
};

describe('SalaryService', () => {
  let service: SalaryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SalaryService,
        { provide: environment, useValue: mockEnvironment }
      ]
    });

    service = TestBed.inject(SalaryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculateNetSalary', () => {
    it('should send a POST request to calculate net salary', () => {
      const annualSalary = 60000;
      const mockResponse: SalaryModel = {
        grossAnnualSalary: annualSalary,
        grossMonthlySalary: 5000,
        netAnnualSalary: 48000,
        netMonthlySalary: 4000,
        totalTax: 12000,
        totalMonthlyTaxes: 1000,
      };

      service.calculateNetSalary(annualSalary).subscribe((result) => {
        expect(result).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${mockEnvironment.apiUrl}/Tax/calculate`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ annualSalary: annualSalary });

      req.flush(mockResponse);
    });
  });

  describe('getSalaryCalculationsHistory', () => {
    it('should send a GET request to fetch salary calculations history', () => {
      const recordsAmount = 5;
      const mockResponse: SalaryModel[] = [
        {
          grossAnnualSalary: 60000,
          grossMonthlySalary: 5000,
          netAnnualSalary: 48000,
          netMonthlySalary: 4000,
          totalTax: 12000,
          totalMonthlyTaxes: 1000,
        },
        {
          grossAnnualSalary: 70000,
          grossMonthlySalary: 5833.33,
          netAnnualSalary: 56000,
          netMonthlySalary: 4666.67,
          totalTax: 14000,
          totalMonthlyTaxes: 1166.67,
        },
      ];

      service.getSalaryCalculationsHistory(recordsAmount).subscribe((result) => {
        expect(result).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${mockEnvironment.apiUrl}/Tax/history?amount=${recordsAmount}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse); // Provide a mock server response
    });

    it('should use the default amount if no recordsAmount is passed', () => {
      const defaultRecordsAmount = 10;
      const mockResponse: SalaryModel[] = [
        {
          grossAnnualSalary: 80000,
          grossMonthlySalary: 6666.67,
          netAnnualSalary: 64000,
          netMonthlySalary: 5333.33,
          totalTax: 16000,
          totalMonthlyTaxes: 1333.33,
        },
      ];

      service.getSalaryCalculationsHistory().subscribe((result) => {
        expect(result).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${mockEnvironment.apiUrl}/Tax/history?amount=${defaultRecordsAmount}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockResponse);
    });
  });
});