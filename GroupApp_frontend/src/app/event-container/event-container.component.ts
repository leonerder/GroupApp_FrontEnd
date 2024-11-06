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
    this.filters = new Filter("",undefined,undefined,Type.SPORT,undefined);
    this.populate(); 
    this.updateName('');
    this.applyFilters();
  }

  private populate(){    
    //da cambiare con la chiamata a backend per popolare l'array
    if(this.events){
      this.events[0] = new Event("partitozza", new Date(), "campetto", "venite solo se siete scarsi e non avete nulla da fare effettivamente, perche qui non siamo molto forti", Type.SPORT, Target.FAMILY);
      this.events[1] = new Event("partitina", new Date(), "campetto", "venite solo se siete scarsi e non avete nulla da fare effettivamente, perche qui non siamo molto forti", Type.SPORT, Target.ADULTS);
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
              ((this.filters.endDate ? ev.date <= this.filters.endDate : true) || 
              (this.filters.startdate ? ev.date >= this.filters.startdate : true)) && 
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
  private _date;
  private _place;
  private _description;
  private _type;
  private _target;
  
  

  constructor(name: string, date: Date, place: String, description: String, type: Type, target: Target){
    
    this._name = name;
    this._date = date;
    this._place = place;
    this._description = description;
    this._type = type;
    this._target = target;
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
    return this._date;
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
  READING = "Reading",
  NULL = ''
}

export enum Target{
  FAMILY = "Famiglie",
  KIDS = "Bambini",
  TEENAGERS = "Ragazzi",
  ADULTS = "Adulti",
}
