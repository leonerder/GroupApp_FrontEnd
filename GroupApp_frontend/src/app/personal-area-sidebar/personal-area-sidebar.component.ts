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
    ])
  ],
  templateUrl: './personal-area-sidebar.component.html',
  styleUrl: './personal-area-sidebar.component.css'
})
export class PersonalAreaSidebarComponent {
  @Input() slideToggle: 'open' | 'closed' = 'closed';

  @Output() eventInfo = new EventEmitter<Event>();

  myEvents: Event[] | undefined = []; 

  constructor(){
    if(this.myEvents){
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
      this.myEvents[0] = new Event("partitozza", new Date(), tomorrow, "campetto", "venite solo se siete scarsi e non avete nulla da fare effettivamente, perche qui non siamo molto forti", Type.SPORT, Target.FAMILY, 0, 10);
      this.myEvents[1] = new Event("partitina", new Date(), tomorrow, "campetto", "venite solo se siete scarsi e non avete nulla da fare effettivamente, perche qui non siamo molto forti", Type.SPORT, Target.ADULTS, 10, 12);
      this.myEvents[2] = new Event("Gruppo Lettura", new Date(), tomorrow,"Biblioteca Comunale", "Consueta lettura in compagnia per grandi e piccini", Type.CULTURA, Target.FAMILY, 0, 100);
      this.myEvents[3] = new Event("Gruppo Lettura", new Date(), tomorrow,"Biblioteca Comunale", "Consueta lettura in compagnia per grandi e piccini", Type.CULTURA, Target.FAMILY, 0, 100);
      this.myEvents[4] = new Event("Gruppo Lettura", new Date(), tomorrow,"Biblioteca Comunale", "Consueta lettura in compagnia per grandi e piccini", Type.CULTURA, Target.FAMILY, 0, 100);
      this.myEvents[5] = new Event("Gruppo Lettura", new Date(), tomorrow,"Biblioteca Comunale", "Consueta lettura in compagnia per grandi e piccini", Type.CULTURA, Target.FAMILY, 0, 100);
      this.myEvents[6] = new Event("Gruppo Lettura", new Date(), tomorrow,"Biblioteca Comunale", "Consueta lettura in compagnia per grandi e piccini", Type.CULTURA, Target.FAMILY, 0, 100);
      this.myEvents[7] = new Event("Gruppo Lettura", new Date(), tomorrow,"Biblioteca Comunale", "Consueta lettura in compagnia per grandi e piccini", Type.CULTURA, Target.FAMILY, 0, 100);
      this.myEvents[8] = new Event("Gruppo Lettura", new Date(), tomorrow,"Biblioteca Comunale", "Consueta lettura in compagnia per grandi e piccini", Type.CULTURA, Target.FAMILY, 0, 100);
    }
    }

  onClick(){
    this.slideToggle = this.slideToggle == 'open' ? 'closed' : 'open';
  }
}
