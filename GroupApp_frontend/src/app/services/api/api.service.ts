import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable, Subject } from 'rxjs';
// import { Event } from '../../event-container/event-container.component';
import { User } from '../../app.component';
import { Filter } from '../../filter-sidebar/filter-sidebar.component';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = 'http://localhost:3000';
  private http: HttpClient;
  private headers: HttpHeaders;
  private user = new Subject<User>();
  private token: string | null;

  constructor(h: HttpClient) {
      if (typeof window !== 'undefined') {
        this.token = localStorage.getItem('token');
      } else {
        this.token = null;
      }
      this.headers = new HttpHeaders();
      this.http = h;
      this.user.subscribe({
        next: (u) => {
          this.headers.set("Authorization", `Bearer ${u.token}`)
        },
        error: (err) => console.log(err)
      });
    }

  updateUser(u: User) {
    this.user.next(u);
    console.log(u);
  }

  getUser(): Observable<User>{
    return this.user.asObservable();
  }

  createDraft(event: any){
    const headers = this.headers.set("Authorization", `Bearer ${this.token}`)
    return this.http.post('http://localhost:3000/event/create',event,{headers});   
  }

  getEvents(s: number): Observable<any[]>{
    return this.http.get<any[]>(this.url + "/event/unfiltered" + '?start=' + s); 
  }

  getEventsFiltered(s: number, filter: Filter | null): Observable<any[]>{
    let searchurl = this.url+'/event/filtered?';
    if(s!=0) searchurl += 'start=' + s;
    if(filter?.date) {
      const yyyy = filter.date.getFullYear();
      const mm = String(filter.date.getMonth() + 1).padStart(2, '0'); // Add 1 and pad with zero
      const dd = String(filter.date.getDate()).padStart(2, '0'); // Pad with zero
      searchurl += `&date=${yyyy}-${mm}-${dd}`;
    }
    if(filter?.name) searchurl += '&title='+ filter.name;
    if(filter?.price) searchurl += '&price='+ filter.price;
    if(filter?.target ) searchurl += '&target='+ filter.target;
    if(filter?.type) searchurl += '&category='+ filter.type;

    return this.http.get<any[]>(searchurl); 
  }

  delete_event(id: string){
    const headers = this.headers.set("Authorization", `Bearer ${this.token}`);
    return this.http.delete(this.url+`/control/event?id=${id}`, {headers});
  }

  delete_draft(id: string){
    const headers = this.headers.set("Authorization", `Bearer ${this.token}`);
    return this.http.delete(this.url+`/control/draft?id=${id}`, {headers});
  }

  getDraftsFiltered(s: number, filter: Filter | null): Observable<any[]>{
    let searchurl = this.url+'/control/drafts?';
    if(s!=0) searchurl += 'start=' + s;
    if(filter?.date) {
      const yyyy = filter.date.getFullYear();
      const mm = String(filter.date.getMonth() + 1).padStart(2, '0'); // Add 1 and pad with zero
      const dd = String(filter.date.getDate()).padStart(2, '0'); // Pad with zero
      searchurl += `&date=${yyyy}-${mm}-${dd}`;
    }
    if(filter?.name) searchurl += '&title='+ filter.name;
    if(filter?.price) searchurl += '&price='+ filter.price;
    if(filter?.target) searchurl += '&target='+ filter.target;
    if(filter?.type) searchurl += '&category='+ filter.type;

    const headers = this.headers.set("Authorization", `Bearer ${this.token}`)
    
    return this.http.get<any[]>(searchurl, {headers});
  }

  register(user: any){
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

  token_access(){
    
    const headers = this.headers.set("Authorization", `Bearer ${this.token}`)
    return this.http.post(this.url+'/access/token_access', { token: this.token }, {headers});
  }

  accept_draft(id: string){
    const headers = this.headers.set("Authorization", `Bearer ${this.token}`)
    return this.http.post(this.url+`/control/approve`,{id: id}, {headers});
  }

  reject_draft(id: string){
    const headers =  this.headers.set("Authorization", `Bearer ${this.token}`);
    return this.http.delete(this.url+`/control/draft?id=${id}`, {headers});

  }

  partecipate(id: string){
    const headers = this.headers.set("Authorization", `Bearer ${this.token}`);
    return this.http.post(this.url+`/partecipation/join?event=${id}`,{}, {headers});
  }

  unpartecipate(id: string){
    const headers = this.headers.set("Authorization", `Bearer ${this.token}`);
    return this.http.delete(this.url+`/partecipation/leave?event=${id}`,{headers});
  }

  getPartecipations(id: string){
    return this.http.get(this.url+`/event/partecipants?id=${id}`);
  }

  getSubscribedEvents(){
    const headers = this.headers.set("Authorization", `Bearer ${this.token}`);
    return this.http.get(this.url+`/event/yourPartecipations?start=0`, {headers});
  }

  getOrganizedEvents(){
    const headers = this.headers.set("Authorization", `Bearer ${this.token}`);
    return this.http.get(this.url+`/event/yourEvents?start=0`, {headers});
  }

  getOrganizedDraft(){
    const headers = this.headers.set("Authorization", `Bearer ${this.token}`);
    return this.http.get(this.url+`/event/yourDrafts?start=0`, {headers});
  }

  createEvent(e: any){
    const headers = this.headers.set("Authorization", `Bearer ${this.token}`);
    return this.http.post(this.url+`/event/create`, {headers});
  }

  

}
