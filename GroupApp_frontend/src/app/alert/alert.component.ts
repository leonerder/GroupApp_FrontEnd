import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { LinkingService } from '../services/linking/linking.service';
import { NgIf } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [MatIcon, NgIf],
  animations: [
    trigger('openAlert',[
      transition(':enter',[
        style({transform: 'translateY(-200%)'}),
        animate('0.3s ease', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave',[
        style({transform: 'translateY(0%)'}),
        animate('0.3s ease', style({transform: 'translateY(-200%)'})) //not working right
      ])
    ])
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})

export class AlertComponent {
  isOpen: boolean = false;
  title: string = '';
  text: string = '';
  type: AlertTypes = AlertTypes.INFO;

  constructor(linkService: LinkingService){
    linkService.getAlert().subscribe({
      next: (text) => {
        this.text = text[0]
        this.type = text[1]
        this.isOpen = true;
        this.switchTitle()
      },
      error: (err) => console.log(err)
    })

    this.switchTitle()
  }

  ngOnInit(){
    setTimeout(() => {
      this.isOpen = false;
    }, 5000);
  }

  switchTitle(){
    switch(this.type) {
      case (AlertTypes.ERROR) : this.title = "Errore"; break;
      case (AlertTypes.INFO) : this.title = "Avviso"; break;
    }
  }

  toggle(){
    this.isOpen = false;
  }
}

export enum AlertTypes{
  ERROR,
  INFO
}