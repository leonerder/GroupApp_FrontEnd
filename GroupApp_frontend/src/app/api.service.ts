import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from './event-container/event-container.component';
import { User } from './app.component';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http://localhost:3000'
  private http: HttpClient;

  constructor( h: HttpClient) {
    this.http = h;
  }

  createDraft(event: any){
    return this.http.post('http://localhost:3000/eventi/',event);
  }

  getEvents(start: number): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/eventi?start=0');
  }

  getDrafts(start: number): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/drafts');
  }

  register(user: User){
    return this.http.post('http://localhost:3000/registration', {
      mail: user.email,
      password: user.password,
      name: user.name,
      dateOfBirth: user.birthdate,
      surname: user.lastname,
      telephone: user.telephone
    })
  }

  access(loginInfo: any){
    return this.http.post('http://localhost:3000/access', loginInfo);
  }



}
