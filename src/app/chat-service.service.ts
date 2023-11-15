import { HttpClient } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private api = 'http://ec2-35-87-129-144.us-west-2.compute.amazonaws.com:3000/';
  constructor(private http: HttpClient) { }
  getChatResponse(param: any): Observable<any> {
    return this.http.post(`${this.api}getWhtspMsg`, param);
  }  
}
