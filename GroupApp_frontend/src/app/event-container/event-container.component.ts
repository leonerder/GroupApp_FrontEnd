import { Component, EventEmitter, Output } from '@angular/core';
import { EventcardComponent } from '../eventcard/eventcard.component';
import { NgFor } from '@angular/common';
import { Filter } from '../topbar/topbar.component';

@Component({
  selector: 'app-event-container',
  standalone: true,
  imports: [EventcardComponent, NgFor],
  templateUrl: './event-container.component.html',
  styleUrl: './event-container.component.css'
})

export class EventContainerComponent {

  @Output() event_out = new EventEmitter<Event>();

  private filters: Filter;
  private events: Event[] | null;
  private events_shown: Event[] | null;
  constructor(){
    this.events = [];
    this.events_shown = [];
    this.filters = new Filter("",undefined,undefined,undefined,undefined);
    this.populate();
    this.updateName('');
    this.applyFilters();
  }

  private populate(){    
    //da cambiare con la chiamata a backend per popolare l'array
    if(this.events){
      fetch('http://localhost:3000/eventi?price=701&date="2026-11-19"')
        .then( res => {
          if(res.ok){
            return res.json();
          } else {
            throw new Error('API request failed');
          }
        })
        .then(data => {
          for(const e of data){
            let ev = new Event();
            ev.name = e.title;
            ev.date = new Date(e.date);
            ev.place = e.location;
            ev.description = e.description;
            ev.type = e.type;
            ev.target = e.target;
            ev.price = e.price;
            ev.maxPartecipants = 100;
            ev.actualPartecipants = 0;
            this.events?.push(ev);
          }
        })
        .catch(err => {
          console.log(err);
        })

        console.log(this.events);
    }
  }

  public updateName(name: string){
    this.filters.name = name;
    this.applyFilters();
  }

  public updateFilter(filter: Filter){
    this.filters.date = filter.date;
    this.filters.endDate = filter.endDate;
    this.filters.type = filter.type;
    this.filters.target = filter.target;
    this.applyFilters();
  }

  public applyFilters(){
    if(this.events){
      this.events_shown = this.events
      this.events_shown = this.events.filter((ev) => {
        console.log(this.filters.date);
        console.log(ev.date);
        return ev.name.includes(this.filters.name) && 
              (!isNaN(Date.parse(this.filters.endDate.toDateString())) ? ev.date <= this.filters.endDate : true) &&
              (!isNaN(Date.parse(this.filters.date.toDateString())) ? ev.date >= this.filters.date : true) && 
              (this.filters.target ? ev.target == this.filters.target : true) && 
              (this.filters.type ? ev.type == this.filters.type : true);
      })
    }
    console.log(this.events);
  }

  public get event_list(){
    return this.events;
  }

  emit(e: Event){
    this.event_out.emit(e);
  }



}

export class Event{

  private _name: string;
  private _startDate;
  private _place;
  private _description;
  private _type;
  private _target;
  private _price;
  private _maxPartecipants;
  private _actualPartecipants;

  
  
  

  constructor(){
    
    this._name = '' ;
    this._startDate = new Date();
    this._place = '';
    this._description = '';
    this._type = Type.NULL;
    this._target =Target.NULL;
    this._price = 0;
    this._maxPartecipants = 0;
    this._actualPartecipants = 0;
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
  
  public get actualPartecipants() {
    return this._actualPartecipants;
  }
  public set actualPartecipants(value) {
    this._actualPartecipants = value;
  }

  public remaining_places(){
    return this._maxPartecipants - this._actualPartecipants;
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
  KIDS = "Bambini",
  TEENAGERS = "Ragazzi",
  ADULTS = "Adulti",
  NULL = ''
}
