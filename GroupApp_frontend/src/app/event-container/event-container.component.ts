import { Component, EventEmitter, inject, Output } from '@angular/core';
import { EventcardComponent } from '../eventcard/eventcard.component';
import { CommonModule, NgFor } from '@angular/common';
import { Filter } from '../topbar/topbar.component';
import { ApiService } from '../services/api/api.service';
import {  HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { LinkingService } from '../services/linking/linking.service';
import { User } from '../app.component';
import { link } from 'fs';

@Component({
  selector: 'app-event-container',
  standalone: true,
  imports: [CommonModule, EventcardComponent],
  templateUrl: './event-container.component.html',
  styleUrl: './event-container.component.css'
})

export class EventContainerComponent {

  @Output() event_out = new EventEmitter<Event>();
  private filters: Filter;
  private events: Event[];
  purpose: 'Richieste' | 'Eventi' = 'Eventi';
  start = 0;
  justAdd = false;
  admin = false;
  logged = false;

  constructor(private apiService: ApiService, private listService: LinkingService){

    apiService.getUser().subscribe({
      next: (u) => {
        this.logged = true;
        this.admin = u.isAdmin;
      },
      error: (err) => {
        this.logged = false;
        this.admin = false;
      }
    })
    
    listService.getList().subscribe({
      next: (p) => {
        this.purpose = p
        
        if(p == 'Eventi'){
          this.populate();
        }else{
          this.populateDrafts();
        }
      },
      error: (err) => console.log(err)
    })

    listService.getFilters().subscribe({
      next: (f) => {
        console.log(f)
        this.filters = f;
        if(this.purpose == 'Eventi'){
          this.populate();
        }else{
          this.populateDrafts();
        }
      },
      error: (err) => console.log(err)
    })

    listService.getReload().subscribe({
      next: (b) => {
        if(b){
          this.ngOnInit();
        }
      },
      error: (err) => console.log(err)
    })
    
    this.events = [];
    this.filters = new Filter(undefined,undefined,undefined,undefined,undefined);
    
  }

  ngOnInit(){
    if(this.purpose == 'Eventi'){
      this.populate();
    }else{
      this.populateDrafts();
    }
    
  }

  private populate(){
      this.apiService.getEventsFiltered(this.start, this.filters).subscribe({
        next: (data: string | any[]) => {
              if(!this.justAdd) this.events = [];
              this.start = 0;
              this.justAdd = false;
              for(let e = 0; e<data.length; e++){
                let ev = new Event();
                ev.id = data[e]._id,
                ev.date = new Date(data[e].date);
                ev.name = data[e].title;
                ev.description = data[e].description;
                ev.maxPartecipants = data[e].max_subs;
                ev.target = data[e].target;
                ev.type = data[e].category;
                ev.price = data[e].price;
                ev.place = data[e].location;

                this.events.push(ev);
                //console.log(ev)
              }
            },
            error: (err: any) => console.log(err)
      })
      
    }

    private populateDrafts(){
      this.apiService.getDraftsFiltered(this.start, this.filters).subscribe({
        next: (data: string | any[]) => {

          if(!this.justAdd) this.events = [];
          this.start = 0;
          this.justAdd = false;
          for(let e = 0; e<data.length; e++){
            let ev = new Event();
            ev.id = data[e]._id,
            ev.date = new Date(data[e].date);
            ev.name = data[e].title;
            ev.description = data[e].description;
            ev.maxPartecipants = data[e].max_subs;
            ev.target = data[e].target;
            ev.type = data[e].category;
            ev.price = data[e].price;
            ev.place = data[e].location;

            this.events.push(ev);
            //console.log(ev)
          }
        },
            error: (err) => console.log(err)
      })
      
    }
    
  seeMore(){
    this.justAdd = true;
    this.start += 100;
    this.ngOnInit()
  }

  public get event_list(){
    return this.events;
  }



}

export class Event{

  private _id: string;
  private _name: string;
  private _startDate;
  private _place;
  private _description;
  private _type;
  private _target;
  private _price;
  private _maxPartecipants;

  
  
  

  constructor(){
    
    this._id = '';
    this._name = '' ;
    this._startDate = new Date();
    this._place = '';
    this._description = '';
    this._type = Type.NULL;
    this._target =Target.NULL;
    this._price = 0;
    this._maxPartecipants = 0;
  }


  public get id(): string {
    return this._id;
  }
  public set id(value: string) {
    this._id = value;
  }

  public get price() {
    return this._price;
  }

  public set type(value) {
    this._type = value;
  }
  public set description(value) {
    this._description = value;
  }
  public set place(value) {
    this._place = value;
  }
  public set price(value) {
    this._price = value;
  }
  
  public get maxPartecipants() {
    return this._maxPartecipants;
  }
  public set maxPartecipants(value) {
    this._maxPartecipants = value;
  }

  public get target() {
    return this._target;
  }
  public set target(value) {
    this._target = value;
  }
  public get name() {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }
  
  public get date() {
    return this._startDate;
  }
  public set date(value) {
    this._startDate = value;
  }
  
  public get place(){
    return this._place;
  }
  public get description(){
    return this._description;
  }
  public get type() {
    return this._type;
  }

}

export enum Type{
  SPORT = "Sport",
  CULTURA = "Cultura",
  NULL = ''
}

export enum Target{
  FAMILY = "Famiglie",
  TEENAGERS = "Ragazzi",
  ADULTS = "Adulti",
  NULL = ''
}
