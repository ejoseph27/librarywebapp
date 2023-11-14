// student-login-dialog.component.ts
import { Component, Inject, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-studentlogin',
  templateUrl: './studentlogin.component.html',
  styleUrls: ['./studentlogin.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StudentloginComponent {
  data: any = { name: '', postalcode: '' };

  constructor(
    public dialogRef: MatDialogRef<StudentloginComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    // Copy dialogData to avoid modifying the original object
    this.data = { ...dialogData };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}