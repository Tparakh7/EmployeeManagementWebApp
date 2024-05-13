import { AddEmployeeRequestModel } from './../models/employees.model';
import { Injectable } from '@angular/core';
import { Employees } from '../models/employees.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/enviroment.development';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) {}

  GetAllEmployees(): Observable<Employees[]> {
    return this.http.get<Employees[]>(this.baseApiUrl + 'api/employees');
  }

  GetEmployeeById(id: string): Observable<Employees[]> {
    return this.http.get<Employees[]>(this.baseApiUrl + 'api/employees/' + id);
  }

  AddEmployee(
    addEmployeeRequest: AddEmployeeRequestModel
  ): Observable<Employees[]> {
    return this.http.post<Employees[]>(
      this.baseApiUrl + 'api/employees',
      addEmployeeRequest
    );
  }

  UpdateEmployee(
    id: string,
    updateEmployeeRequest: AddEmployeeRequestModel
  ): Observable<Employees[]> {
    return this.http.put<Employees[]>(
      this.baseApiUrl + 'api/employees/' + id,
      updateEmployeeRequest
    );
  }

  DeleteEmployee(id: string): Observable<Employees[]> {
    return this.http.delete<Employees[]>(
      this.baseApiUrl + 'api/employees/' + id
    );
  }
}
