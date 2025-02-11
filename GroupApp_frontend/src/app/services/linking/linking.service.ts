import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../../app.component';
import { Filter } from '../../filter-sidebar/filter-sidebar.component';
import { Event } from '../../event-container/event-container.component';

@Injectable({
  providedIn: 'root'
})
export class LinkingService {
  private list_shown = new Subject<'Richieste' | 'Eventi'>();
  private filters = new Subject<Filter>();
  private f: Filter = new Filter();
  private reload= new Subject<boolean>();
  private draftCreated = new Subject<any>();
  private menu = new Subject<any>();
  private eventInfo = new Subject<Event>();

  constructor() { 
    this.getFilters().subscribe({
      next: (f) => {
        this.f = f;
      },
      error: (err) => console.log(err)
    })
  }

  openMenu(){
    this.menu.next({});
  }

  getMenu(){
    return this.menu.asObservable();
  }

  updateEvent(e: Event){
    this.eventInfo.next(e);
  }

  getEvent(){
    return this.eventInfo.asObservable();
  }



  updateDraft(){
    this.draftCreated.next(0);
  }

  getDraftCreated(){
    return this.draftCreated.asObservable();
  }

  updateReload(b: boolean) {
    this.reload.next(b);
  }

  getReload(): Observable<boolean> {
    return this.reload;
  }
  

  updateFilters(data: Filter){
    this.filters.next(data);
  }

  updateName(data: string){
    this.f.name = data;
    this.filters.next(this.f);
  }

  getFilters(): Observable<Filter> {
    return this.filters.asObservable();
  }

  sendList(data: 'Richieste' | 'Eventi'){
    this.list_shown.next(data);
  }

  getList(): Observable<'Richieste' | 'Eventi'> {
    return this.list_shown.asObservable();
  }
}
