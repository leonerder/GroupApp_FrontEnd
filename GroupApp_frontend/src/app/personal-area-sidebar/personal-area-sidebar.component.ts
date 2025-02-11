import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { EventcardReducedComponent } from '../eventcard-reduced/eventcard-reduced.component';
import { Event, Target, Type } from '../event-container/event-container.component';
import { NgFor, NgIf } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs'; 
import { ApiService } from '../services/api/api.service';
import { LinkingService } from '../services/linking/linking.service';

@Component({
  selector: 'app-personal-area-sidebar',
  standalone: true,
  imports: [MatIcon, NgFor, NgIf, EventcardReducedComponent, MatTabsModule],
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
    ]),
    trigger('popup',[
      transition(':enter',[
        style({
          transform: 'translateY(200%)',
          borderRadius: '40px',
          width: '2vh',
          height: '2vh',
          color: 'transparent'
        }),
        animate('0.3s ease', style({
                                transform: 'translateY(0%)',
                                borderRadius: '6px',
                                width: '15%',
                                height: 'fit-content',
                                
                              }))
      ]),
      transition(':leave',[
        style({transform: 'translateY(0%)'}),
        animate('0.3s ease', style({transform: 'translateY(200%)'})) //not working right
      ])
    ])
  ],
  templateUrl: './personal-area-sidebar.component.html',
  styleUrl: './personal-area-sidebar.component.css',
})
export class PersonalAreaSidebarComponent {
  @Input() slideToggle: 'open' | 'closed' = 'closed';

  @Output() eventCreate = new EventEmitter();

  mySubs: Event[] = [];
  myEvents: Event[] = []; 
  myDrafts: Event[] = [];

  openCreateMenu: 'open' | 'closed' = 'closed';

  constructor(private apiService: ApiService, private linkService: LinkingService){
    linkService.getReload().subscribe({
      next: (data) => this.ngOnInit(),
      error: (err) => console.log(err)
    })

    linkService.getDraftCreated().subscribe({
      next: () => this.slideToggle = 'open',
      error: (err) => console.log(err)
    })

    linkService.getEvent().subscribe({
      next: () => this.slideToggle = 'closed',
      error: (err) => console.log(err),
    })
  
  }

  ngOnInit(){
    this.populate()
  }

  populate(){
    this.apiService.getSubscribedEvents().subscribe({
      next: (data: any) => {
        this.mySubs = [];
        console.log(data)
          
        for(let e = 0; e<data.length; e++){
          let ev = new Event();
          ev.id = data[e]._id,
          ev.date = new Date(data[e].date);
          ev.name = data[e].title;
          ev.description = data[e].description;
          ev.maxPartecipants = data[e].max_subs;
          ev.target = data[e].target;
          ev.type = data[e].category;
          ev.price = data[e].price;
          ev.place = data[e].location;
          this.mySubs.push(ev);
          console.warn(ev)
          
        }
      },
      error: (err) => console.log(err)
    });

    this.apiService.getOrganizedDraft().subscribe({
      next: (data: any) => {
        this.myDrafts = [];
        //console.log(data)
          
        for(let e = 0; e<data.length; e++){
          let ev = new Event();
          ev.id = data[e]._id,
          ev.date = new Date(data[e].date);
          ev.name = data[e].title;
          ev.description = data[e].description;
          ev.maxPartecipants = data[e].max_subs;
          ev.target = data[e].target;
          ev.type = data[e].category;
          ev.price = data[e].price;
          ev.place = data[e].location;
          this.myDrafts.push(ev);
          //console.warn(ev)
          
        }
      },
      error: (err) => console.log(err)
    });

    this.apiService.getOrganizedEvents().subscribe({
      next: (data: any) => {
        this.myEvents = [];
        //console.log(data)
          
        for(let e = 0; e<data.length; e++){
          let ev = new Event();
          ev.id = data[e]._id,
          ev.date = new Date(data[e].date);
          ev.name = data[e].title;
          ev.description = data[e].description;
          ev.maxPartecipants = data[e].max_subs;
          ev.target = data[e].target;
          ev.type = data[e].category;
          ev.price = data[e].price;
          ev.place = data[e].location;
          this.myEvents.push(ev);
          //console.warn(ev)
        }
      },
      error: (err) => console.log(err)
    })
  }
  
  onClick(){
    this.slideToggle = this.slideToggle == 'open' ? 'closed' : 'open';
  }

  openMenu(){
    this.openCreateMenu = this.openCreateMenu == 'open' ? 'closed' : 'open';
  }

}
