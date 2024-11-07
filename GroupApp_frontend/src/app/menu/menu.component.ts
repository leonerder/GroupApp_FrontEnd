import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  animations:[
    trigger('openMenu',[
      transition(':enter',[
        style({transform: 'translateY(100%)'}),
        animate('0.5s ease', style({transform: 'translateY(0%)'}))
      ]),
      transition(':leave',[
        style({transform: 'translateY(0%)'}),
        animate('0.5s ease', style({transform: 'translateY(-100%)'})) //not working right
      ])
    ])
  ],
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
