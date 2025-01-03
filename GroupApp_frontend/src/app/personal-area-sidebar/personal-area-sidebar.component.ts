import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { EventcardReducedComponent } from '../eventcard-reduced/eventcard-reduced.component';
import { Event, Target, Type } from '../event-container/event-container.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-personal-area-sidebar',
  standalone: true,
  imports: [MatIcon, NgFor, EventcardReducedComponent],
  animations: [
    trigger('slide', [
      state('open',
        style({
          transform: 'translateX(-5%)'
        })
      ),
      state('closed',
        style({
          transform: 'translateX(90%)'
        })
      ),
      transition('*=> closed', [animate('0.3s ease')]),
      transition('*=> open', [animate('0.3s ease')]),
    ]),
    trigger('create', [
      state('open',
        style({
          transform: 'rotate(-225deg)'
        })
      ),
      state('closed',
        style({
          transform: 'rotate(0deg)'
        })
      ),
      transition('*=> closed', [animate('0.5s ease')]),
      transition('*=> open', [animate('0.5s ease')]),
    ])
  ],
  templateUrl: './personal-area-sidebar.component.html',
  styleUrl: './personal-area-sidebar.component.css'
})
export class PersonalAreaSidebarComponent {
  @Input() slideToggle: 'open' | 'closed' = 'closed';

  @Output() eventInfo = new EventEmitter<Event>();

  myEvents: Event[] | undefined = []; 

  openCreateMenu: 'open' | 'closed' = 'closed';

  constructor(){
    if(this.myEvents){
      let ev = new Event();
            ev.name = 'Partita';
            ev.date = new Date();
            ev.place = 'ez';
            ev.description = 'vieni susu';
            ev.type = Type.CULTURA;
            ev.target = Target.ADULTS;
            ev.price = 0;
            ev.maxPartecipants = 100;
            ev.actualPartecipants = 0;
            this.myEvents.push(ev);
    }
  }
  
  onClick(){
    this.slideToggle = this.slideToggle == 'open' ? 'closed' : 'open';
  }

  openMenu(){
    this.openCreateMenu = this.openCreateMenu == 'open' ? 'closed' : 'open';
  }
}
