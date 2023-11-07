import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { application } from 'express';


@Injectable({
  providedIn: 'root'
})
export class DatalistService {

  private baseUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }
  getBooks() {

    const headers = new HttpHeaders({
      'Url': 'http://localhost:3000/api/booklist', //             
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.get<any>(`${this.baseUrl}/booklist`, { headers: headers });
  }
  getStudents() {

    const headers = new HttpHeaders({
      'Url': 'http://localhost:3000/api/studentlist', //             
      'Content-Type': 'application/json; charset=utf-8',
    });
    return this.http.get<any>(`${this.baseUrl}/studentlist`, { headers: headers });
  }


  borrowBook(data: object): Observable<any>{

    return this.http.post<any>(`${this.baseUrl}/borrowbook`, data);
  }
  returnBook(data: object): Observable<any>{

    return this.http.post<any>(`${this.baseUrl}/returnbook`, data);
  }
  

}

