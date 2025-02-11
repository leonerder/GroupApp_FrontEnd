import { trigger, state, style, transition, animate } from '@angular/animations';
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Event, Target, Type } from '../event-container/event-container.component';
import { PDFDocument } from 'pdf-lib';
import { ApiService } from '../services/api/api.service';
import { LinkingService } from '../services/linking/linking.service';
import { User } from '../app.component';
import { link } from 'fs';


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
  eventForm;
  user: User | null;

  constructor(private apiService: ApiService, private linkService: LinkingService, private fb: FormBuilder){
    this.user = null;
    apiService.getUser().subscribe({
      next: (u) => this.user = u,
      error: (err) => console.log(err)
    })
    this.isOpen = false;
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', Validators.required],
      place: ['', Validators.required],
      target: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      max_subs: [1, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required]]
    });
  }

  close(){
    this.isOpen = false
  }

  submitDraft(){
    this.err = '';
    this.valErr = false;
    let event = {
        title: this.eventForm.value.title,
        date: this.eventForm.value.date,
        location: this.eventForm.value.place,
        category: this.eventForm.value.category,
        target: this.eventForm.value.target,
        price: this.eventForm.value.price,
        description: this.eventForm.value.description,
        max_subs: this.eventForm.value.max_subs
      }
      console.log(event);
    if(this.eventForm.valid){
      this.apiService.createDraft(event).subscribe({
        next: (d) => {
          console.log(d);
          this.linkService.updateReload(true);
        },
        error: (err) => {
          this.linkService.updateReload(true);
          console.log(err);
          
        }
      });
      this.isOpen = false;
      this.linkService.updateDraft();
    } else {
      
      console.log('tutti i campi sono obbligatori');
      this.err += 'attenzione, tutti i campi sono obbligatori';
      this.valErr = true;
    }
    

  }


  async savePdf(){
    const url = 'assets/file/M0608_agg.pdf';

    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    const fieldNames = form.getFields().map(field => field.getName());
    console.log(fieldNames);

    form.getTextField('2').setText(localStorage.getItem('name') || '');  
    form.getTextField('3').setText(localStorage.getItem('birthPlace') || '');
    
    const eventDate = new Date(localStorage.getItem('birthDay') ?? this.user?.birthdate ?? '');
    if(eventDate != new Date()){
      const year = eventDate.getFullYear();
      const month = ('0' + (eventDate.getMonth() + 1)).slice(-2);
      const day = ('0' + eventDate.getDate()).slice(-2);
      const formattedDate = `${day}/${month}/${year}`;
      form.getTextField('4').setText(formattedDate); 
    }
    
    form.getTextField('5').setText(localStorage.getItem('CF') || ''); 
    form.getTextField('6').setText(localStorage.getItem('P') || ''); 
    form.getTextField('7').setText(localStorage.getItem('C') || ''); 
    form.getTextField('8').setText(localStorage.getItem('address') || ''); 
    form.getTextField('9').setText(localStorage.getItem('CAP') || ''); 
    if(this.user){
      form.getTextField('10').setText(this.user.telephone.toString());
      form.getTextField('11').setText(this.user.email);
    }
    
    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'modulo_organizzazione.pdf';
    link.click();
  }

}
