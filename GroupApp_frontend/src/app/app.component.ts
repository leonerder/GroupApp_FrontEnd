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


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, EventContainerComponent, FilterSidebarComponent, MenuComponent, CommonModule, PersonalAreaSidebarComponent, EventPageComponent],
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

  @ViewChild('personal') personal: PersonalAreaSidebarComponent | undefined;

  @ViewChild('events') events: EventContainerComponent | undefined;
  onName(filter: Filter){
    this.events?.updateName(filter.name);
  }
  onFilter(filter: Filter){
    console.log(filter);
    console.log(filter.startdate.toDateString());
    this.events?.updateFilter(filter);
    this.onClick();
  }
  @ViewChild('filters') filter: FilterSidebarComponent | undefined;

  @ViewChild('menu') menu: MenuComponent | undefined;

  @ViewChild('eventInfo') eventInfo: EventPageComponent | undefined;

  moreInfo(e: Event){
    this.clickOut();
    if(this.eventInfo){
      this.eventInfo.event = e;
      this.eventInfo.isOpen = 'open';
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
    ;
  }

}