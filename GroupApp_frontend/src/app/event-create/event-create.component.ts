import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Event, Target, Type } from '../event-container/event-container.component';
import { PDFDocument } from 'pdf-lib';


@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [MatIcon, NgIf, NgFor, FormsModule, ReactiveFormsModule,],
  templateUrl: './event-create.component.html',
  animations: [
    trigger('slide',[
      transition(':enter',[
        style({transform: 'translateY(120%)'}),
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

  valErr: boolean = false;
  err: string = '';

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
    this.isOpen =false;
  }

  close(){
    this.isOpen = false
  }

  submitDraft(){
    this.err = '';
    this.valErr = false;
    if(this.eventForm.valid){
      let event = new Event();
      event.name = this.eventForm.value.name ? this.eventForm.value.name : '';
      event.date = this.eventForm.value.startDate ? new Date(this.eventForm.value.startDate) : new Date('');
      event.place = this.eventForm.value.place ? this.eventForm.value.place : '';
      event.type = this.eventForm.value.type ? this.eventForm.value.type : Type.NULL;
      event.target = this.eventForm.value.target ? this.eventForm.value.target : Target.NULL;
      event.price = this.eventForm.value.price ? this.eventForm.value.price : 0;
      event.description = this.eventForm.value.description ? this.eventForm.value.description : '';
      event.maxPartecipants = this.eventForm.value.maxPartecipants ? this.eventForm.value.maxPartecipants : 0;
      event.actualPartecipants = 0;

      fetch()
      console.log(event);

    } else {
      console.log('tutti i campi sono obbligatori');
      this.err += 'attenzione, tutti i campi sono obbligatori';
      this.valErr = true;
    }
    

  }


  async savePdf(){
    const url = 'assets/file/M0608_agg.pdf';  // Modifica con il percorso del tuo file PDF

    // Carica il PDF esistente come array di byte
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());

    // Carica il documento PDF con pdf-lib
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Ottieni il modulo del PDF
    const form = pdfDoc.getForm();

    const fieldNames = form.getFields().map(field => field.getName());
    console.log(fieldNames);

    // Modifica i campi del modulo
    form.getTextField('2').setText('Mario Rossi');  // Modifica il campo "nome"
    form.getTextField('3').setText('Via Roma 123');  // Modifica il campo "indirizzo"
    
    // Puoi aggiungere altre modifiche, come la compilazione di altri campi, se presenti
    
    // Salva il PDF modificato
    const pdfBytes = await pdfDoc.save();

    // Crea un blob dal PDF modificato
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    // Crea un link per il download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'modificato_copia.pdf';  // Nome della copia modificata
    link.click();
  }

}
