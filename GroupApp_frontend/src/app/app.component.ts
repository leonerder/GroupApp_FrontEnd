import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './topbar/topbar.component';
import { EventcardComponent } from './eventcard/eventcard.component';
import { EventContainerComponent } from './event-container/event-container.component';
import { Filter } from './topbar/topbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, EventContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GroupApp_frontend';

  @ViewChild('events') events: EventContainerComponent | undefined;

  onFilter(filter: Filter){
    console.log(filter.name);
    this.events?.updateFilters(filter)
  }

}
