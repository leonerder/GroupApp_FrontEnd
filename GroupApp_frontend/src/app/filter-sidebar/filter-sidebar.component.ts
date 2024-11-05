import { NgClass } from '@angular/common';
import { booleanAttribute, Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [MatIcon, NgClass],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.css'
})
export class FilterSidebarComponent {
  private clicked: boolean;

  constructor(){
    this.clicked = false;
  }
 
  public onClick(){
    this.clicked = !this.clicked;
  }

  public get isClicked(){
    return this.clicked;
  }

  public set isClicked(b: boolean){
    this.clicked = b;
  }
}
