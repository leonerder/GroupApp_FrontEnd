import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { LinkingService } from '../services/linking/linking.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { AlertTypes } from '../alert/alert.component';

@Component({
  selector: 'app-notification-tab',
  standalone: true,
  imports: [MatIcon, NgIf, NgFor],
  animations:[
    trigger('openNotification',[
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
  templateUrl: './notification-tab.component.html',
  styleUrl: './notification-tab.component.css'
})
export class NotificationTabComponent {

  isOpen: boolean = false;
  text: string = ''
  notifications: {id:string,type: Notification, message: string}[] = []

  constructor(private linkService: LinkingService){
    linkService.getReload().subscribe({
      next: (data) => {
        if(data == true) this.ngOnInit()
      },
      error: (err) => console.log(err)
    })

    linkService.getNotification().subscribe({
      next: () => {
        this.isOpen = !this.isOpen
      },
      error: (err) => console.log(err)
    })

  }

  ngOnInit(){
    this.populate_notification();
  }

  populate_notification(){
    // call a notification in api
    let res: {i:string, t: Notification, d: string}[] = [{i: '34', t: Notification.deleted_draft, d:'nome draft'}]
    console.log(res)
    for (let {i,t, d} of res){

      let msg = '';
      switch(t){
        case Notification.deleted_partecipation:
          msg = `L'evento ${d} a cui partecipavi è stato annullato`;
        break;
        case Notification.deleted_draft:
          msg = `La tua draft ${d} è stata rifiutata`;
        break;
        case Notification.deleted_event:
          msg = `Il tuo evento ${d} è stato eliminato`;
        break;
        case Notification.new_partecipant:
          msg = `Hai un nuovo partecipante al tuo evento ${d}!`;
        break;
        case Notification.new_draft:
          msg = `Una nuova bozza ${d} è stata creata`;
        break;
        default:
          msg = 'Errore imprevisto';
      }
      
      this.notifications.push({id: i, type: t, message: msg})
    }
    console.log(this.notifications)
  }

  delete(id: string){
    //chiamata api per il delete della notifica
    this.notifications = []
    this.linkService.updateAlert(["Notifica eliminata con successo", AlertTypes.INFO])
  }

  toggle(){
    this.isOpen = false;
  }
}

export enum Notification{
  deleted_partecipation="deleted_partecipation",
  deleted_draft="deleted_draft",
  deleted_event="deleted_event",
  new_partecipant="new_partecipant",
  new_draft="new_draft"
}
