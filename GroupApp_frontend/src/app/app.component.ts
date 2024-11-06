import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { EventcardComponent } from './eventcard/eventcard.component';
import { EventContainerComponent } from './event-container/event-container.component';
import { Filter } from './topbar/topbar.component';
import { FilterSidebarComponent } from './filter-sidebar/filter-sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, EventContainerComponent, FilterSidebarComponent],
  templateUrl: './app.component.html',
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
    if(this.filter) this.filter.isClicked = false;
  }
  

}
