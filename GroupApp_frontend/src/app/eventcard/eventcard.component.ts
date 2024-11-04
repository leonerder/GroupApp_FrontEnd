import { Component, Input, Optional } from '@angular/core';
import { Event } from '../event-container/event-container.component';

@Component({
  selector: 'app-eventcard',
  standalone: true,
  imports: [],
  templateUrl: './eventcard.component.html',
  styleUrl: './eventcard.component.css'
})

export class EventcardComponent {
  @Input() 
  event: Event | undefined;

}


