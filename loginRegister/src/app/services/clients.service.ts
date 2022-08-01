import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';
import { Login } from '../interfaces/login';
import { environment } from 'src/environments/environment';

const baseURL = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class clientService {

  emailCheckUnique: any;
  details(user: { username: any; email: any;  password: any; }) {
    throw new Error('Method not implemented.');
  }

  constructor(private http : HttpClient) { }

  login(client : any): Observable<any> {
    return this.http.post(`${baseURL}login`, client);
  }

  signup(client : any, userType: string) {
    return this.http.post(`${baseURL}signup/${userType}`, client);
  }

  logout(client : any, userType: string) {
    localStorage.removeItem('username');
    return this.http.post(`${baseURL}logout/${userType}`, client);
  }
  update(client : any, userType: string) {
    return this.http.post(`${baseURL}update/${userType}`, client);
  }

  saveMyDocs(object : {}) {
    return this.http.post(`${baseURL}myDocs`, object);
  }

  getMyDocs(object : {}) {
    return this.http.post(`${baseURL}get-docs`, object)
  }

  forgotPassword(object : {}){
    return this.http.post(`${baseURL}forgot-password`, object);
  }

  updatePassword(object : {}) {
    return this.http.post(`${baseURL}update-password`, object);
  }
}

