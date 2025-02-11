import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginOption, TopbarComponent } from './topbar/topbar.component';
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
import { LoginComponent } from './login/login.component';
import { ApiService } from './services/api/api.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TopbarComponent, EventContainerComponent, FilterSidebarComponent, MenuComponent, CommonModule, PersonalAreaSidebarComponent, EventPageComponent,EventCreateComponent, LoginComponent],
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
  logged = false;

  constructor(private apiService: ApiService){}

  ngOnInit(){
    const token = localStorage.getItem("token");
    
    if(token) {
      this.apiService.token_access().subscribe({
        next: (val: any) => {
          var user = new User(
            val.user.mail,
            val.user.password,
            val.user.name,
            val.user.surname,
            val.user.dateOfBirth,
            val.user._id,
            val.user.isAdmin,
            val.user.telephone
          )
          user.token = token;
          this.apiService.updateUser(user);
          this.logged = true;
        },
        
        error: (err) => {
          console.error('Errore:', err.error?.error ? err : "errore ignoto");    
        }
      });
      
    }

  }

  title = 'GroupApp_frontend';

  purp: "login" | "signup" = 'login';

  user: User | undefined;

  @ViewChild('personal') personal: PersonalAreaSidebarComponent | undefined;

  @ViewChild('events') events: EventContainerComponent | undefined;

  @ViewChild('filters') filter: FilterSidebarComponent | undefined;

  @ViewChild('menu') menu: MenuComponent | undefined;

  @ViewChild('eventInfo') eventInfo: EventPageComponent | undefined;

  @ViewChild('create') create: EventCreateComponent | undefined;

  @ViewChild('login') login: LoginComponent | undefined;

  @ViewChild('topbar') topbar: TopbarComponent | undefined;

  requests = false;

  switchRequest(){
    this.requests = !this.requests;
  }

  


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

  toggleMenu(log: LoginOption){
    switch (log) {
      case 0: {
        if(this.menu) {
          this.menu.slideToggle = 'open';
        }
        break;
      } 
      case 2: {
        if(this.login) {
          this.login.open = false;
          this.purp = 'login';
          this.login.open = true;

        }
        break;
      } 
      case 1: {
        if(this.login) {
          this.login.open = false;
          this.purp = 'signup';
          this.login.open = true;
        }
        break;
      } 
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

    if(this.login){
      this.login.open = false;
    }
  }

}

export class User {
  private _email: string;
  private _password: string;
  private _name: string;
  private _lastname: string;
  private _birthdate: Date;
  private _id: string;
  private _telephone: number;
  private _isAdmin: boolean;
  

  constructor(em: string, pw: string, n: string, l: string, d: Date, t: string, a: boolean, tel: number){
    this._email = em;
    this._password = pw;
    this._name = n;
    this._lastname = l;
    this._birthdate = d;
    this._id= t;
    this._isAdmin = a;
    this._telephone = tel;
  }

  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }

  public get telephone(): number {
    return this._telephone;
  }
  public set telephone(value: number) {
    this._telephone = value;
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
  
  public get id(): string {
    return this._id;
  }
  public set token(value: string) {
    this._id = value;
  }

  public get isAdmin(): boolean {
    return this._isAdmin;
  }
  public set isAdmin(value: boolean) {
    this._isAdmin = value;
  }

}