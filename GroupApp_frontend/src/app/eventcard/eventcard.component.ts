import { Component, EventEmitter, Input, Optional, Output } from '@angular/core';
import { Event } from '../event-container/event-container.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatIcon } from '@angular/material/icon';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { ApiService } from '../services/api/api.service';
import { LinkingService } from '../services/linking/linking.service';

@Component({
  selector: 'app-eventcard',
  standalone: true,
  imports: [MatIcon, NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf],
  animations: [
    trigger('hovering', [
      transition(":enter", [
        style({ transform: 'translateY(-100%)'}),
        animate('0.3s ease-in-out', style({ transform: 'translateY(0%)' }))
      ]),
      transition(":leave", [
        style({ transform: 'translateY(0%)'}),
        animate('0.3s ease-in-out', style({ transform: 'translateY(-100%)'}))
      ])
    ]),
    trigger('slide', [
      state('hovering',
        style({
          transform: 'translateY(-60%)'
        })
      ),
      state('out',
        style({
          transform: 'translateY(0%)'
        })
      ),
      transition('*=> out', [animate('0.3s ease')]),
      transition('*=> hovering', [animate('0.3s ease')]),
    ]),
    trigger('slide-text', [
      state('hovering',
        style({
          transform: 'translateY(-45%)'
        })
      ),
      state('out',
        style({
          transform: 'translateY(0%)'
        })
      ),
      transition('*=> out', [animate('0.3s ease')]),
      transition('*=> hovering', [animate('0.3s ease')]),
    ]),
  ],
  templateUrl: './eventcard.component.html',
  styleUrl: './eventcard.component.css',
})

export class EventcardComponent {
  @Input() event: Event = new Event();
  @Input() request: "Richieste" | "Eventi" = "Eventi";
  
  hovering : 'hovering' | 'out' = 'out'
  shown_icon: string = "question_mark";
  date: string = "";
  remaining_places = 0;

  logged: boolean = false;
  admin: boolean = false;

  constructor(private apiService: ApiService, private linkService: LinkingService){
    
  }

  ngOnInit(){
    if (this.event?.date) {
      const eventDate = new Date(this.event.date);
      const year = eventDate.getFullYear();
      const month = ('0' + (eventDate.getMonth() + 1)).slice(-2);
      const day = ('0' + eventDate.getDate()).slice(-2);
      const formattedDate = `${day}/${month}/${year}`;
      this.date = formattedDate;

      this.linkService.getList().subscribe({
        next: (req) => {
          this.request = req;
          console.error(this.request);
        },
        error: (err) => console.log(err)
      });
      this.apiService.getPartecipations(this.event.id).subscribe({
        next: (data: any) => {
          this.remaining_places = this.event.maxPartecipants - data.partecipants;
        },
        error: (err: any) => console.log(err)
      });
      this.apiService.getUser().subscribe({
        next: (u) => {
          this.logged = true;
          this.admin = u.isAdmin;
        },
        error: () => {
          this.logged = false;
          this.admin = false;
        }
      })
    }
    
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
    this.apiService.accept_draft(this.event.id).subscribe({
      next: (data) => {
        this.linkService.updateReload(true);
        console.log(data)
      },
      error: (err) => console.log(err),
    });

    
  }

  reject(){
    this.apiService.reject_draft(this.event.id).subscribe({
      next: (data: any) => {
        this.linkService.updateReload(true);
        console.log(data.message)
      },
      error: (err: any) => console.log(err.message)
    });
  }

  join(){
    this.apiService.partecipate(this.event.id).subscribe({
      next: (data) => {
        this.linkService.updateReload(true);
        console.log(data)
      },
      error: (err) => {
        this.linkService.updateReload(true);
        console.log(err)
      }
    });
    
  }

  emit_event(){
    this.linkService.updateEvent(this.event);
  }

  delete(){
    console.log(this.request);
    if(this.request == "Richieste") {
      this.apiService.delete_draft(this.event.id).subscribe({
        next: () => {
          this.linkService.updateReload(true)
          console.log("Draft deleted");
        },
        error: (err) => console.log(err)
      });
    } else {
      this.apiService.delete_event(this.event.id).subscribe({
        next: () => {
          this.linkService.updateReload(true)
          console.log("Event deleted");
        },
        error: (err) => console.log(err)
      });
    }
  }
}


