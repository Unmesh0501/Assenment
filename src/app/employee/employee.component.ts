// src/app/employee/employee.component.ts
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Employee.service';  // Correct path
import { Employee } from '../Employee';  // Correct path
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];  // Initialize the array
  employeeForm!: FormGroup;

  constructor(private employeeService: EmployeeService, private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      name: [''],
      salary: [''],
      age: ['']
    });
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  createEmployee() {
    this.employeeService.createEmployee(this.employeeForm.value).subscribe(data => {
      this.getEmployees();
    });
  }

  editEmployee(employee: Employee) {
    this.employeeForm.setValue({
      name: employee.name,
      salary: employee.salary,
      age: employee.age
    });
  }

  updateEmployee(id: number) {
    this.employeeService.updateEmployee(id, this.employeeForm.value).subscribe(data => {
      this.getEmployees();
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      this.getEmployees();
    });
  }
}
