import {
  AddEmployeeRequestModel,
  Employees,
} from './../../../models/employees.model';
import { EmployeesListComponent } from './../employees-list/employees-list.component';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '../../../services/employees.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrl: './update-employee.component.css',
})
export class UpdateEmployeeComponent {
  employeeId: string | null;
  employees: any;
  updateEmployeeRequestModel = new AddEmployeeRequestModel();
  updateEmployeeForm: FormGroup = this.formBuilder.group({
    employeeName: [''],
    employeeEmail: [''],
    employeePhone: [],
    employeeAddress: [],
  });

  constructor(
    private route: ActivatedRoute,
    private employeesService: EmployeesService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.employeeId = this.route.snapshot.paramMap.get('id');
    if (this.employeeId) {
      this.employeesService.GetEmployeeById(this.employeeId).subscribe({
        next: (employees) => {
          console.log(employees);
          this.employees = employees;
          this.updateEmployeeForm.patchValue({
            employeeName: this.employees.name,
            employeeEmail: this.employees.email,
            employeePhone: this.employees.phone,
            employeeAddress: this.employees.address,
          });
        },
        error: (response) => {
          console.log(response);
        },
      });
    }
  }

  updateEmployee(formValue: any) {
    this.updateEmployeeRequestModel.name = formValue.employeeName;
    this.updateEmployeeRequestModel.email = formValue.employeeEmail;
    this.updateEmployeeRequestModel.phone = formValue.employeePhone;
    this.updateEmployeeRequestModel.address = formValue.employeeAddress;
    console.log('req mod', this.updateEmployeeRequestModel);

    if(this.employeeId !== null){
      this.employeesService
        .UpdateEmployee(this.employeeId, this.updateEmployeeRequestModel)
        .subscribe({
          next: (employees) => {
            console.log(employees);
            this.routeToEmployeeList();
          },
          error: (response) => {
            console.log('error', response);
          },
        });
    } else {
      console.log('employee id is null');
    }
  }

  routeToEmployeeList() {
    this.router.navigateByUrl('/employees-list');
  }
}
