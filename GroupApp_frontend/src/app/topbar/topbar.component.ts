import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Filter } from '../filter-sidebar/filter-sidebar.component';
import { User } from '../app.component';
import { NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [MatIconModule, FormsModule, NgSwitch, NgSwitchCase, NgSwitchDefault, NgIf],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  @Input() user: User | undefined;

  @Output() filter_out = new EventEmitter<Filter>();
  @Output() switchRequest = new EventEmitter();
  @Output() menu_out = new EventEmitter();
  filter: Filter = new Filter();
  filter_name = this.filter.name;
  
  public updateFilter(){
    this.filter.name = this.filter_name.toLowerCase().replaceAll(/\s/g,'');
    this.filter_out.emit(this.filter);
  }
  

}





export { Filter };

