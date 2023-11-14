import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddStudentComponent {

    //data: any = { type: '', title: '', code: '', available: false, name: '', postalcode: '' };
    //book: any= { title: '', code: '', available: false };
    data:any = { type:'', name:'', postalcode:''}
    constructor(
      public dialogRef: MatDialogRef<AddStudentComponent>,
      @Inject(MAT_DIALOG_DATA) public dialogData: any
    ) {
      
        // Copy dialogData
        this.data = { ...dialogData };
        //console.log("DATA", this.data, dialogData);
  
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  
}
