import { Component } from '@angular/core';
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
      let tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.events[0] = new Event("partitozza", new Date(), tomorrow, "campetto", "venite solo se siete scarsi e non avete nulla da fare effettivamente, perche qui non siamo molto forti", Type.SPORT, Target.FAMILY, 0, 10);
      this.events[1] = new Event("partitina", new Date(), tomorrow, "campetto", "venite solo se siete scarsi e non avete nulla da fare effettivamente, perche qui non siamo molto forti", Type.SPORT, Target.ADULTS, 10, 12);
      this.events[2] = new Event("Gruppo Lettura", new Date(), tomorrow,"Biblioteca Comunale", "Consueta lettura in compagnia per grandi e piccini", Type.CULTURA, Target.FAMILY, 0, 100);
      this.events[3] = new Event("Gruppo Lettura", new Date(), tomorrow,"Biblioteca Comunale", "Consueta lettura in compagnia per grandi e piccini", Type.CULTURA, Target.FAMILY, 0, 100);
      this.events[4] = new Event("Gruppo Lettura", new Date(), tomorrow,"Biblioteca Comunale", "Consueta lettura in compagnia per grandi e piccini", Type.CULTURA, Target.FAMILY, 0, 100);
      this.events[5] = new Event("Gruppo Lettura", new Date(), tomorrow,"Biblioteca Comunale", "Consueta lettura in compagnia per grandi e piccini", Type.CULTURA, Target.FAMILY, 0, 100);
      this.events[6] = new Event("Gruppo Lettura", new Date(), tomorrow,"Biblioteca Comunale", "Consueta lettura in compagnia per grandi e piccini", Type.CULTURA, Target.FAMILY, 0, 100);
      this.events[7] = new Event("Gruppo Lettura", new Date(), tomorrow,"Biblioteca Comunale", "Consueta lettura in compagnia per grandi e piccini", Type.CULTURA, Target.FAMILY, 0, 100);
      this.events[8] = new Event("Gruppo Lettura", new Date(), tomorrow,"Biblioteca Comunale", "Consueta lettura in compagnia per grandi e piccini", Type.CULTURA, Target.FAMILY, 0, 100);
      
    }
  }

  public updateName(name: string){
    this.filters.name = name;
    this.applyFilters();
  }

  public updateFilter(filter: Filter){
    this.filters.startdate = filter.startdate;
    this.filters.endDate = filter.endDate;
    this.filters.type = filter.type;
    this.filters.target = filter.target;
    this.applyFilters();
  }

  public applyFilters(){
    
    if(this.events){
      this.events_shown = this.events
      this.events_shown = this.events.filter((ev) => {
        console.log(this.filters.startdate);
        console.log(ev.date)
        return ev.name.includes(this.filters.name) && 
              (!isNaN(Date.parse(this.filters.endDate.toDateString())) ? ev.date <= this.filters.endDate : true) &&
              (!isNaN(Date.parse(this.filters.startdate.toDateString())) ? ev.date >= this.filters.startdate : true) && 
              (this.filters.target ? ev.target == this.filters.target : true) && 
              (this.filters.type ? ev.type == this.filters.type : true);
      })
    }
    console.log(this.events_shown);
  }

  public get event_list(){
    return this.events_shown;
  }



}

export class Event{

  private _name: string;
  private _startDate;
  private _endDate;
  private _place;
  private _description;
  private _type;
  private _target;
  private _price;
  private _maxPartecipants;
  private _actualPartecipants;
  
  

  constructor(name: string, start_date: Date, end_date: Date, place: String, description: String, type: Type, target: Target, price: number, maxP: number){
    
    this._name = name;
    this._startDate = start_date;
    this._endDate = end_date;
    this._place = place;
    this._description = description;
    this._type = type;
    this._target = target;
    this._price = price;
    this._maxPartecipants = maxP;
    this._actualPartecipants = 0;
  }

  public get price() {
    return this._price;
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
  public get date(){
    return this._startDate;
  }
  public get end_date(){
    return this._endDate;
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
