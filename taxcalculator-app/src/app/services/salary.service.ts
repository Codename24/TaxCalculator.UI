import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalaryModel } from '../models/salary.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {
  private baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  calculateNetSalary(annualSalary: number): Observable<SalaryModel> {
    return this.http.post<SalaryModel>(`${this.baseUrl}/Tax/calculate`, {
      "annualSalary" : annualSalary,
    });
  }

  getSalaryCalculationsHistory(recordsAmmount: number = 10):Observable<SalaryModel[]>{
    return this.http.get<SalaryModel[]>(`${this.baseUrl}/Tax/history/?amount=${recordsAmmount}`)
  }
}
