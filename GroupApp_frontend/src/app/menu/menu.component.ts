import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { info } from 'console';
import { LinkingService } from '../services/linking/linking.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgIf, MatIcon, ReactiveFormsModule],
  templateUrl: './menu.component.html',
  animations:[
    trigger('openMenu',[
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
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  slideToggle: 'open'|'closed';
  infoForm: FormGroup;

  constructor(private fb: FormBuilder, private linkService: LinkingService){

    linkService.getMenu().subscribe({
      next: () => {
        this.slideToggle = 'open';
        this.openMenu();
      }
    })

    this.slideToggle = 'closed';
    this.infoForm = this.fb.group({
      name: [''],
      birthPlace: [''],
      birthDay: [''],
      CF: [''],
      P: [''],
      C: [''],
      address: [''],
      CAP: ['']
    });
  }

  openMenu(){
    this.infoForm.setValue({
      name: localStorage.getItem('name'),
      birthPlace: localStorage.getItem('birthPlace'),
      birthDay: localStorage.getItem('birthDay'),
      CF: localStorage.getItem('CF'),
      P: localStorage.getItem('P'),
      C: localStorage.getItem('C'),
      address: localStorage.getItem('address'),
      CAP: localStorage.getItem('CAP')
    })
  }

  clear(){
    localStorage.setItem("name", '');
    localStorage.setItem("birthPlace",'');
    localStorage.setItem("birthDay",'');
    localStorage.setItem("CF",'');
    localStorage.setItem("P",'');
    localStorage.setItem("C",'');
    localStorage.setItem("address",'');
    localStorage.setItem("CAP",'');
    this.openMenu();
  }

  submitStorage(){
    if(this.infoForm.valid){
      localStorage.setItem("name", this.infoForm.value.name ? this.infoForm.value.name : '');
      localStorage.setItem("birthPlace", this.infoForm.value.birthPlace ? this.infoForm.value.birthPlace : '');
      localStorage.setItem("birthDay", this.infoForm.value.birthDay ? this.infoForm.value.birthDay : '');
      localStorage.setItem("CF", this.infoForm.value.CF ? this.infoForm.value.CF : '');
      localStorage.setItem("P", this.infoForm.value.P ? this.infoForm.value.P : '');
      localStorage.setItem("C", this.infoForm.value.C ? this.infoForm.value.C : '');
      localStorage.setItem("address", this.infoForm.value.address ? this.infoForm.value.address : '');
      localStorage.setItem("CAP", this.infoForm.value.CAP ? this.infoForm.value.CAP : '');
    }
  }


}
