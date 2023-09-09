import { HttpClient } from '@angular/common/http';
import { Injectable,Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  private api = 'http://172.190.80.184:5000/bot-question';
  constructor(private http: HttpClient) { }
  getChatResponse(param: any): Observable<any> {
    return this.http.post(`${this.api}`, param);
  }
}