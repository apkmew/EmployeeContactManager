import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { employees as importedEmployees } from './employee';
import { AddNewEmployeeDialogComponent } from './add-new-employee-dialog/add-new-employee-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatDialogModule, MatButtonModule, AddNewEmployeeDialogComponent, MatIconModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  employees = [...importedEmployees];
  title = 'Employee Contact Manager';

  constructor(private dialog: MatDialog) {}

  onEdit(employee: any, ) {
    const dialogRef = this.dialog.open(AddNewEmployeeDialogComponent, {
      width: '400px',
      data: { employee, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.employees.indexOf(employee);
        this.employees[index] = result; // Upda
      }
    });
  }

  onDelete(employee: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: employee
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employees = this.employees.filter(e => e !== employee);
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddNewEmployeeDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Add new employee', result);
        this.employees.push(result);
      } else {
        console.log('User cancelled the dialog.');
      }
    });
  }
  
}