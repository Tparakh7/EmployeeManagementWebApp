import { Component } from '@angular/core';
import { EmployeesService } from '../../../services/employees.service';
import { Employees } from '../../../models/employees.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.css',
})
export class EmployeesListComponent {
  employees: Employees[] = [];

  constructor(
    private employeesService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.GetAllEmployees();
  }
  GetAllEmployees() {
    this.employeesService.GetAllEmployees().subscribe({
      next: (result) => {
        this.employees = result;
      },
      error: (response) => {
        console.log('error', response);
      },
    });
  }

  routeToAddEmployee() {
    this.router.navigateByUrl('add-employee');
  }

  RouteToUpdateEmployee(id: string) {
    this.router.navigateByUrl('update-employee/' + id);
  }

  DeleteEmployee(id: string) {
    this.employeesService.DeleteEmployee(id).subscribe({
      next: (employee) => {
        console.log(employee);
        this.GetAllEmployees();
      },
      error: (response) => {
        console.log('error', response);
      },
    });
  }
}
