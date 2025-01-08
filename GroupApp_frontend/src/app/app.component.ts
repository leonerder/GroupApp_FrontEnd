import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { Event, EventContainerComponent } from './event-container/event-container.component';
import { Filter } from './topbar/topbar.component';
import { FilterSidebarComponent } from './filter-sidebar/filter-sidebar.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PersonalAreaSidebarComponent } from './personal-area-sidebar/personal-area-sidebar.component';
import { EventPageComponent } from './event-page/event-page.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { exitCode } from 'node:process';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, EventContainerComponent, FilterSidebarComponent, MenuComponent, CommonModule, PersonalAreaSidebarComponent, EventPageComponent,EventCreateComponent],
  templateUrl: './app.component.html',
  animations:[
    trigger('goDark',[
      transition(':enter',[
        style({opacity: 0}),
        animate('0.3s ease', style({opacity: 0.2}))
      ]),
      transition(':leave',[
        style({opacity: 0.2}),
        animate('0.3s ease', style({opacity: 0}))
      ])
    ]),
  ],
  styleUrl: './app.component.css'
})



export class AppComponent {
  title = 'GroupApp_frontend';

  user: User | undefined;

  @ViewChild('personal') personal: PersonalAreaSidebarComponent | undefined;

  @ViewChild('events') events: EventContainerComponent | undefined;

  requests = false;

  switchRequest(){
    this.requests = !this.requests;
  }

  onName(filter: Filter){
    this.events?.updateName(filter.name);
  }
  
  onFilter(filter: Filter){
    console.log(filter);
    console.log(filter.date.toDateString());
    this.events?.updateFilter(filter);
    this.onClick();
  }
  @ViewChild('filters') filter: FilterSidebarComponent | undefined;

  @ViewChild('menu') menu: MenuComponent | undefined;

  @ViewChild('eventInfo') eventInfo: EventPageComponent | undefined;

  @ViewChild('create') create: EventCreateComponent | undefined;


  moreInfo(e: Event){
    this.clickOut();
    if(this.eventInfo){
      this.eventInfo.event = e;
      this.eventInfo.isOpen = 'open';
    }
    
  }

  openCreate(){
    this.clickOut();
    if(this.create){
      this.create.isOpen = true;
    }
  }

  toggleMenu(){
    if(this.menu?.slideToggle){
      this.menu.slideToggle = 'open';
    }
  }

  onClick(){
    if(this.filter){
      this.filter.filterClicked = this.filter.filterClicked == 'closed' ? 'open' : 'closed';
    }
  }
  
  clickOut(){
    if(this.create){
      this.create.isOpen = false;
    }

    if(this.filter){
      this.filter.filterClicked = 'closed';
    }

    if(this.personal?.slideToggle){
      this.personal.slideToggle = 'closed';
    }

    if(this.menu?.slideToggle){
      this.menu.slideToggle = 'closed'; 
    }

    if(this.eventInfo){
      this.eventInfo.isOpen = 'closed'
    }
  }

}

export class User {
  _email: string;
  _name: string;
  _lastname: string;
  _birthdate: Date;
  _token: string;
  _isAdmin: boolean;
  

  constructor(em: string, n: string, l: string, d: Date, t: string, a: boolean){
    this._email = em;
    this._name = n;
    this._lastname = l;
    this._birthdate = d;
    this._token = t;
    this._isAdmin = a;
  }

  
  public get email(): string {
    return this._email;
  }
  public set email(value: string) {
    this._email = value;
  }
  
  public get name(): string {
    return this._name;
  }
  public set name(value: string) {
    this._name = value;
  }
  
  public get lastname(): string {
    return this._lastname;
  }
  public set lastname(value: string) {
    this._lastname = value;
  }
  
  public get birthdate(): Date {
    return this._birthdate;
  }
  public set birthdate(value: Date) {
    this._birthdate = value;
  }
  
  public get token(): string {
    return this._token;
  }
  public set token(value: string) {
    this._token = value;
  }

  public get isAdmin(): boolean {
    return this._isAdmin;
  }
  public set isAdmin(value: boolean) {
    this._isAdmin = value;
  }

}