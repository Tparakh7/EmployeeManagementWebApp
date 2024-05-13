import { AddEmployeeRequestModel } from './../../../models/employees.model';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesService } from '../../../services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  addEmployeeForm: FormGroup = this.formBuilder.group({
    employeeName: [''],
    employeeEmail: [''],
    employeePhone: [],
    employeeAddress: [],
  });

  addEmployeeRequestModel = new AddEmployeeRequestModel();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private employeesService: EmployeesService
  ) {}

  ngOnInit(): void {}

  addEmployee(formValue: any) {
    this.addEmployeeRequestModel = new AddEmployeeRequestModel();
    this.addEmployeeRequestModel.name = formValue.employeeName;
    this.addEmployeeRequestModel.email = formValue.employeeEmail;
    this.addEmployeeRequestModel.phone = formValue.employeePhone;
    this.addEmployeeRequestModel.address = formValue.employeeAddress;

    this.employeesService.AddEmployee(this.addEmployeeRequestModel).subscribe({
      next: (employee) => {
        console.log(employee);
        this.routeToEmployeeList();
      },
      error: (response) => {
        console.log('error', response);
      },
    });
  }

  routeToEmployeeList() {
    this.router.navigateByUrl('/employees-list');
  }
}
