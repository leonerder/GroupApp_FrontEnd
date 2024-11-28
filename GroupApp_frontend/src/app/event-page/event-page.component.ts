import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Event } from '../event-container/event-container.component';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-page.component.html',
  animations:[
    trigger('openEvent',[
      transition(':enter',[
        style({transform: 'translateY(100%)'}),
        animate('0.3s ease', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave',[
        style({transform: 'translateY(0%)'}),
        animate('0.3s ease', style({transform: 'translateY(120%)'})) //not working right
      ])
    ])
  ],
  styleUrl: './event-page.component.css'
})
export class EventPageComponent {



  isOpen: 'open' | 'closed' = 'closed';
  event: Event | undefined;

  constructor(){
    this.isOpen = 'closed';
  }

  toggle(){
    this.isOpen = this.isOpen == 'closed' ? 'open' : 'closed';
  }
}
