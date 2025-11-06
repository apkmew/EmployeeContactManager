import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-new-employee-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
  ],
  templateUrl: './add-new-employee-dialog.component.html',
  styleUrls: ['./add-new-employee-dialog.component.css'],
})
export class AddNewEmployeeDialogComponent {
  employee: any = {
    name: '',
    email: '',
    phone_number: '',
    job_title: ''
  };

  mode: 'add' | 'edit' = 'add';

  constructor(
    public dialogRef: MatDialogRef<AddNewEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.employee) {
      this.employee = { ...data.employee }; // clone เพื่อไม่ให้แก้ของจริงก่อน save
      this.mode = data.mode || 'edit';
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {

    if(!this.employee.name || !this.employee.email || !this.employee.phone_number || !this.employee.job_title) {
      alert('Please fill in all required fields.');
      return;
    }

    this.dialogRef.close(this.employee);
  }
}