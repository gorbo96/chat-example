import { HttpClient } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private api = 'http://ec2-54-191-249-251.us-west-2.compute.amazonaws.com:3000/';
  constructor(private http: HttpClient) { }
  getChatResponse(param: any): Observable<any> {
    return this.http.post(`${this.api}getWhtspMsg`, param);
  }  
}
