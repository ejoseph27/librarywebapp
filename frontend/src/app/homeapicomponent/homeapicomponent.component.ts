import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { DatalistService } from '../datalist.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-homeapicomponent',
  templateUrl: './homeapicomponent.component.html',
  styleUrls: ['./homeapicomponent.component.css']
})
export class HomeapicomponentComponent implements OnInit {

  books: any[] = [];
  students: any[] = [];

  constructor(private dataService: DatalistService, private http: HttpClient) { }

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
  borrowBook(title: string, code: string, available:boolean): void {

    this.http.post('http://localhost:3000/api/returnbook', {title, code, available }).subscribe((response: any) => {
      if (response.success) {
        const book = this.books.find((b) => b.title === title && b.code === code);
        book.available = false;
      }
    });
  }
  returnBook(title: string, code: string, available:boolean): void {
    this.http.post('http://localhost:3000/api/borrowbook',{title, code, available }).subscribe((response: any) => {
      if (response.success) {
        const book = this.books.find((b) => b.title === title && b.code === code);
        book.available = true;
      }
    });
  }




}
