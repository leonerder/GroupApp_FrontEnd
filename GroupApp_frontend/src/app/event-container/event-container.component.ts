import { Component } from '@angular/core';
import { EventcardComponent } from '../eventcard/eventcard.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-event-container',
  standalone: true,
  imports: [EventcardComponent, NgFor],
  templateUrl: './event-container.component.html',
  styleUrl: './event-container.component.css'
})
export class EventContainerComponent {
  private events: Event[];
  constructor(){
    this.events = [];
    this.events[0] = new Event("partitozza", new Date(), "campetto", "venite solo se siete scarsi e non avete nulla da fare effettivamente, perche qui non siamo molto forti", Type.SPORT);
  }

  public get event_list(){
    return this.events;
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
