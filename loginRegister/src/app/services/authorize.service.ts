import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {


  constructor(private http: HttpClient) { }

  baseurl:string = "http://localhost:4401";

  createUser(body: any){
    return this.http.post(`${this.baseurl}/api/register/`, body);

  }

  loguser(body: any):Observable<any>{
    return this.http.post(`${this.baseurl}/api/login/`, body);
  }




  getClients(body: any){
    return this.http.post(`${this.baseurl}/api/v1/clients`, body);

  }

}
