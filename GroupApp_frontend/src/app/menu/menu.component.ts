import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgIf, MatIcon],
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

  constructor(){
    this.slideToggle = 'closed';
  }


}
