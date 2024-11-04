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
    this.filters = new Filter("");
    this.populate(); 
    this.updateFilters(this.filters)
  }

  private populate(){    
    //da cambiare con la chiamata a backend per popolare l'array
    if(this.events){
      this.events[0] = new Event("partitozza", new Date(), "campetto", "venite solo se siete scarsi e non avete nulla da fare effettivamente, perche qui non siamo molto forti", Type.SPORT);
      this.events[1] = new Event("partitina", new Date(), "campetto", "venite solo se siete scarsi e non avete nulla da fare effettivamente, perche qui non siamo molto forti", Type.SPORT);
    }
  }

  public updateFilters(filter: Filter){
    this.filters = filter;
    if(this.events){
      this.events_shown = this.events.filter((ev) => {
        return ev.name.includes(this.filters.name);
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
  
  

  constructor(name: string, date: Date, place: String, description: String, type: Type){
    
    this._name = name;
    this._date = date;
    this._place = place;
    this._description = description;
    this._type = type;
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
  //non so cosa mettere
}
