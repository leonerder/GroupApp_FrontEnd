import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { EventContainerComponent } from './event-container/event-container.component';
import { Filter } from './topbar/topbar.component';
import { FilterSidebarComponent } from './filter-sidebar/filter-sidebar.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, EventContainerComponent, FilterSidebarComponent, MenuComponent, CommonModule],
  templateUrl: './app.component.html',
  animations:[
    trigger('goDark',[
      transition(':enter',[
        style({opacity: 0}),
        animate('0.5s ease', style({opacity: 0.2}))
      ]),
      transition(':leave',[
        style({opacity: 0.2}),
        animate('0.5s ease', style({opacity: 0}))
      ])
    ])
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GroupApp_frontend';
  

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

  onClick(){
    if(this.filter){
      this.filter.filterClicked = this.filter.filterClicked == 'closed' ? 'open' : 'closed';
      console.log(this.filter.filterClicked);
    }
  
  }
  
  clickOut(){
    if(this.filter){
      this.filter.filterClicked = 'closed';
      console.log(this.filter.filterClicked);
    }
  }

}