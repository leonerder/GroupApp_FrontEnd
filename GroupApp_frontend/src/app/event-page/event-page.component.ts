import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Event } from '../event-container/event-container.component';
import { ApiService } from '../services/api/api.service';
import { LinkingService } from '../services/linking/linking.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-event-page',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './event-page.component.html',
  animations:[
    trigger('openEvent',[
      transition(':enter',[
        style({transform: 'translateY(150%)'}),
        animate('0.3s ease', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave',[
        style({transform: 'translateY(0%)'}),
        animate('0.3s ease', style({transform: 'translateY(150%)'})) //not working right
      ])
    ])
  ],
  styleUrl: './event-page.component.css'
})
export class EventPageComponent {



  isOpen: 'open' | 'closed' = 'closed';
  event: Event = new Event();
  date: string = '';
  partecipants = 0;

  constructor(private apiService: ApiService, private linkService: LinkingService){
    this.linkService.getEvent().subscribe({
      next: (ev) => {
        this.event = ev;
        this.ngOnInit();
        this.isOpen = 'open';
      },
      error: (err) => console.log(err)
    })
    this.apiService.getPartecipations(this.event.id).subscribe({
      next: (data: any) => {
        this.partecipants = this.event.maxPartecipants - data.partecipants;
      },
      error: (err: any) => console.log(err)
    });

  }

  ngOnInit(){
    const eventDate = new Date(this.event.date);
    const year = eventDate.getFullYear();
    const month = ('0' + (eventDate.getMonth() + 1)).slice(-2);
    const day = ('0' + eventDate.getDate()).slice(-2);
    const formattedDate = `${day}/${month}/${year}`;
    this.date = formattedDate;
  }

  toggle(){
    this.isOpen = this.isOpen == 'closed' ? 'open' : 'closed';
  }
}
