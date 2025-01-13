import { animate, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Event } from '../event-container/event-container.component';

@Component({
  selector: 'app-eventcard-reduced',
  standalone: true,
  imports: [MatIcon, NgIf],
  templateUrl: './eventcard-reduced.component.html',
  animations: [
    trigger('infoButton', [
      transition(":enter", [
        style({ transform: 'translateY(120%) scale(1.1) '}),
        animate('50ms ease-in-out', style({ transform: 'translateY(0); scale(1.1)' }))
      ]),
      transition(":leave", [
        style({ transform: 'translateY(0%)'}),
        animate('0.1s ease-in-out', style({ transform: 'translateY(120%)'}))
      ])
    ])
  ],
  styleUrl: './eventcard-reduced.component.css'
})
export class EventcardReducedComponent {
  @Input() event: Event | undefined

  @Output() eventInfo = new EventEmitter<Event>();
  showInfo: boolean = false;

  toggleInfo(){
    this.showInfo = !this.showInfo;
  }
}
