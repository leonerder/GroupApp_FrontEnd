import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Event, Target, Type } from '../event-container/event-container.component';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [MatIcon, NgIf, NgFor, FormsModule, ReactiveFormsModule,],
  templateUrl: './event-create.component.html',
  animations: [
    trigger('slide',[
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
  styleUrl: './event-create.component.css'
})
export class EventCreateComponent {

  isOpen: boolean;
  types = Object.values(Type);
  selectedtype = Type.NULL;
  targets = Object.values(Target);
  selectedTarget = Target.NULL;
  ev: Event = new Event();

  eventForm = new FormGroup({
      name: new FormControl(this.ev.name, Validators.required),
      startDate: new FormControl(this.ev.date,Validators.required),
      place: new FormControl(this.ev.place,Validators.required),
      type: new FormControl(this.ev.type,Validators.required),
      target: new FormControl(this.ev.target,Validators.required),
      price: new FormControl(this.ev.price,Validators.required),
      description: new FormControl(this.ev.description,Validators.required),
      maxPartecipants: new FormControl(this.ev.maxPartecipants, Validators.required),
    })

  constructor(){
    this.isOpen = true;
  }

  close(){
    this.isOpen = false
  }

  submitDraft(){
    this.ev.actualPartecipants = 0;
    

  }

}
