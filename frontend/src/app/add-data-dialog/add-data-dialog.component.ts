import { Component, Inject,ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-data-dialog',
  templateUrl: './add-data-dialog.component.html',
  styleUrls: ['./add-data-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class AddDataDialogComponent {
  //data: any = { type: '', title: '', code: '', available: false, name: '', postalcode: '' };
  data: any= {type:'', title: '', code: '', available: false };
  //student= {name:'', postalcode:''}
  constructor(
    public dialogRef: MatDialogRef<AddDataDialogComponent>,
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
