import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-personal-area-sidebar',
  standalone: true,
  imports: [MatIcon],
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
    ])
  ],
  templateUrl: './personal-area-sidebar.component.html',
  styleUrl: './personal-area-sidebar.component.css'
})
export class PersonalAreaSidebarComponent {
  @Input() slideToggle: 'open' | 'closed' = 'closed';

  onClick(){
    this.slideToggle = this.slideToggle == 'open' ? 'closed' : 'open';
  }
}
