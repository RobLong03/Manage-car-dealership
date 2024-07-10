import { Costumer } from './../../../_model/Costumer';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Telephone } from '../../../_model/Telephone';
import { UserAdmin } from '../../../_model/UserAdmin';
import { catchError, map, Observable, of, tap, timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  isAuthenticated: boolean = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) {
  }
  private token: string | null = null;
  getallphones() {
    return this.http.get<Telephone[]>('http://localhost:7143/all');
  }
  getallcostumers() {
    return this.http.get<Costumer[]>('http://localhost:7143/costumers');
  }
  getnumbersid(){
    return this.http.get<number>('http://localhost:7143/countcust',)
  }
  deletecostumerbyid(id: number) {
    return this.http.delete(`http://localhost:7143/delete/customer/${encodeURIComponent(id)}`, this.httpOptions);
  }
  editcostumer(data: Costumer){
    return this.http.put(`http://localhost:7143/modify/customer`,data,this.httpOptions)
  }
  getCostumerbyid(id:number){
    return this.http.get<Costumer>(`http://localhost:7143/costumers/${encodeURIComponent(id)}`,this.httpOptions)
  }
  getall() {
    return this.http.get<Costumer[]>('http://localhost:3000/Costumer');
  }
  getAllCostumer() {
    return this.http.get<Telephone[]>('https://api.restful-api.dev/objects')
  }
  authenticate(nameuser: string, password: string, authorization: string): Observable<boolean> {
    const url = `http://localhost:7143/auth/${encodeURIComponent(nameuser)}/${encodeURIComponent(password)}/${encodeURIComponent(authorization)}`;
    return this.http.get<{ exists: boolean }>(url).pipe(
      map(response => {
        console.log('Response from server:', response);
        if (response && response.exists) {
          this.isAuthenticated = true;
          localStorage.setItem("auth", response?"exists"+String(timestamp().length):"")
          return true;
        } else {
          this.isAuthenticated = false;
          localStorage.removeItem("auth")
          return false;
        }
      }),
      catchError(error => {
        console.error('Authentication error:', error);
        this.isAuthenticated = false;
        return of(false);
      })
    );
  }
  postcostumer(data: Costumer) {
    return this.http.post<Costumer>('http://localhost:7143/add/customer', data, this.httpOptions)
  }

  isAuthenticatedUser(): boolean {
    return localStorage.getItem('auth') !== null;;
  }
  isLoggedIn() {
    return localStorage.getItem('authUser') !== null;
  }
  logout(): void {

    localStorage.removeItem('authUser');
    this.isAuthenticated = false;
  }


}


