import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [MatIconModule, FormsModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {

  @Output() filter_out = new EventEmitter<Filter>();
  filter: Filter = new Filter("");
  filter_name = this.filter.name;
  
  public updateFilter(){
    this.filter.name = this.filter_name;
    this.filter_out.emit(this.filter);
  }
  

}

export class Filter{
  private _name: string;
  
  constructor(name:string){
    this._name = name;
  }

  public get name(){
    return this._name;
  }

  public set name(n: string){
    this._name=n;
  }


}

