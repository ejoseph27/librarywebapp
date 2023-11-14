import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatalistService } from '../datalist.service';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { AddDataDialogComponent } from '../add-data-dialog/add-data-dialog.component';
import { AddStudentComponent } from '../add-student/add-student.component';

@Component({
  selector: 'app-homeapicomponent',
  templateUrl: './homeapicomponent.component.html',
  styleUrls: ['./homeapicomponent.component.css']
})
export class HomeapicomponentComponent implements OnInit {

  books: any[] = [];
  students: any[] = [];
  title: string = ''; // Add this property
  code: string = ''; // Add this property
  postalcode: string = ''; // Add this property
  name:string='';
  available:boolean= false;
  //type:string='';
  constructor(private dataService: DatalistService, private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
    forkJoin([
      this.dataService.getBooks(),
      this.dataService.getStudents() // Assuming you have a method for fetching student data
    ]).subscribe(([booksData, studentsData]) => {
      this.books = booksData;
      this.students = studentsData;
      console.log("Books Data is ", booksData);
      console.log("Students Data is ", studentsData);
    });

  }
  borrowBook(title: string, code: string, available: boolean): void {
    available=false;
    this.http.post('http://localhost:3000/api/borrowbook', { title, code, available }).subscribe((response: any) => {
      if (response.success) {
        const book = this.books.find((b) => b.title === title && b.code === code);
        console.log("BOOK",book)
        book.available = false;
      }
    });
  }
  returnBook(title: string, code: string, available: boolean): void {
    available=true;
    this.http.post('http://localhost:3000/api/returnbook', { title, code, available }).subscribe((response: any) => {
      if (response.success) {
        const book = this.books.find((b) => b.title === title && b.code === code);
        book.available = true;
        console.log("BOOK",book)
      }
    });
  }

  openAddBookDialog(title: string, code: string, available: boolean): void {
    const dialogRef = this.dialog.open(AddDataDialogComponent, {
      width: '250px',
      data: { type:'book',title: '', code: '', available: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log("Result",result);
        this.http.post('http://localhost:3000/api/addbookslist', { title: result.title, code: result.code, available: result.available })
          .subscribe((response: any) => {
            if (response.success) {
              const book = this.books.find((b) => b.title === result.title && b.code === result.code);
              book.available = false;
            }
          });
        // Add the new book to your book list
        this.books.push(result);
      }
    });
  }

  openAddStudentDialog(name: string, postalcode: string): void {
    const dialogRef = this.dialog.open(AddStudentComponent, {
      width: '250px',
      data: { type:'student', name: '', postalcode: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
     //if the dialogbox have values in the placeholders it is send as a post request
      if (result) {
        this.http.post('http://localhost:3000/api/addstudentlist', { name: result.name, postalcode: result.postalcode })
          .subscribe((response: any) => {
            if (response.success) {
              const student = this.students.find((b) => b.name !== result.name && b.postalcode !== result.postalcode);
              this.students.push(result);
            }
            else {
              console.log("Student already exists");
            }
          });
        // Add the new student to your book list
      
      }
    });
  }




}
