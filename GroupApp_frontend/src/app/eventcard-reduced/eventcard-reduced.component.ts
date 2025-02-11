import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Event } from '../event-container/event-container.component';
import { ApiService } from '../services/api/api.service';
import { LinkingService } from '../services/linking/linking.service';
import { link } from 'fs';

@Component({
  selector: 'app-eventcard-reduced',
  standalone: true,
  imports: [MatIcon, NgIf],
  templateUrl: './eventcard-reduced.component.html',
  animations: [
    trigger('infoButton', [
      transition(":enter", [
        style({ transform: 'translateY(120%)'}),
        animate('50ms ease-in-out', style({ transform: 'translateY(0)' }))
      ]),
      transition(":leave", [
        style({ transform: 'translateY(0%)'}),
        animate('0.1s ease-in-out', style({ transform: 'translateY(120%)'}))
      ])
    ]),
    trigger('hovering', [
      transition(":enter", [
        style({ transform: 'translateX(100%)'}),
        animate('50ms ease-in-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(":leave", [
        style({ transform: 'translateX(0%)'}),
        animate('0.1s ease-in-out', style({ transform: 'translateX(100%)'}))
      ])
    ]),
    trigger('hovering-info', [
      transition(":enter", [
        style({ transform: 'translateX(800%)'}),
        animate('100ms ease-in-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(":leave", [
        style({ transform: 'translateX(0%)'}),
        animate('0.1s 100ms ease-in-out', style({ transform: 'translateX(800%)'}))
      ])
    ]),
    trigger('hovering-action', [
      transition(":enter", [
        style({ transform: 'translateX(800%)'}),
        animate('100ms ease-in-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(":leave", [
        style({ transform: 'translateX(0%)'}),
        animate('0.1s ease-in-out', style({ transform: 'translateX(800%)'}))
      ])
    ]),
    trigger('hovering-title', [
      transition(":enter", [
        style({ transform: 'translateX(-200%)'}),
        animate('100ms 100ms ease-in-out', style({ transform: 'translateX(0%)' }))
      ]),
      transition(":leave", [
        style({ transform: 'translateX(0%)'}),
        animate('0.05s ease-in-out', style({ transform: 'translateX(-200%)'}))
      ])
    ]),
    // trigger('hover', [
    //       state('hovering',
    //         style({
    //           transform: 'translateX(-200%)'
    //         })
    //       ),
    //       state('out',
    //         style({
    //           transform: 'translateX(0%)'
    //         })
    //       ),
    //       transition('*=> closed', [animate('5s ease')]),
    //       transition('*=> open', [animate('5s ease')]),
    //     ]),
  ],
  styleUrl: './eventcard-reduced.component.css'
})
export class EventcardReducedComponent {
  @Input() event: Event = new Event();
  @Input() type: 'draft' | 'event' = 'event'
  @Input() purpose: 'own' | 'partecipation' = 'own'

  hovering: 'hovering' | 'out' = 'out';

  showInfo: boolean = false;

  constructor(private apiService: ApiService, private linkService: LinkingService){
    
  }

  toggleInfo(){
    this.hovering = this.hovering == 'hovering' ? 'out' : 'hovering';
  }

  remove(){
    if(this.type == 'draft'){
      this.apiService.delete_draft_owner(this.event.id).subscribe({
        next: (data) => {
          this.linkService.updateReload(true);
        },
        error: (err) => {
          this.linkService.updateReload(true);
          console.log(err)
        }
      })
    } else {
      this.apiService.delete_event_owner(this.event.id).subscribe({
        next: (data) => {
          this.linkService.updateReload(true);
        },
        error: (err) => {
          this.linkService.updateReload(true);
          console.log(err)
        }
      })
    }

    
    
  }

  event_out(){
    this.linkService.updateEvent(this.event);
  }

  unsubscribe(){
    this.apiService.unpartecipate(this.event.id).subscribe({
      next: (data) => {
        this.linkService.updateReload(true);
        console.log(data);
      },
      error: (err) => {
        this.linkService.updateReload(true);
        console.log(err)
      }
    })
  }
}
