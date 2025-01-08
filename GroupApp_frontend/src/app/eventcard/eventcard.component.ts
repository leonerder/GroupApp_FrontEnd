import { Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { Event } from '../event-container/event-container.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIcon } from '@angular/material/icon';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-eventcard',
  standalone: true,
  imports: [MatIcon, NgSwitch, NgSwitchCase, NgSwitchDefault],
  templateUrl: './eventcard.component.html',
  styleUrl: './eventcard.component.css',
})

export class EventcardComponent {
  @Input() event: Event | undefined;
  @Input() request: boolean | undefined;

  @Output() event_out = new EventEmitter<Event>();
  
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

  accept(){
    //draft accettata

  }

  reject(){
    //draft rifiutata

  }

  join(){
    //partecipazione ad evento
    
  }

  emit_event(){
    console.log(this.event);
    this.event_out.emit(this.event);
  }
}


