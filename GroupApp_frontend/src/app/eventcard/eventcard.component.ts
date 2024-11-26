import { Component, Input, Optional } from '@angular/core';
import { Event } from '../event-container/event-container.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-eventcard',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './eventcard.component.html',
  styleUrl: './eventcard.component.css',
})

export class EventcardComponent {
  @Input() 
  event: Event | undefined;

  shown_icon: string = "question_mark";

  ngOnInit(){
    switch(this.event?.type){
      //aggiungere qui le icone mano a mano che vengono aggiunti tipi di evento
      case "Sport": {
        this.shown_icon = "sports_basketball";
        break;
      }
      case "Cultura": {
        this.shown_icon = "history_edu";
        break;
      }
      case '':{
        this.shown_icon = "question_mark";
        break;
      }
      default: {
        this.shown_icon = "question_mark";
        break;
      }
    }
  }
}


