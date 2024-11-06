import { NgClass, NgFor } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, NgModule, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Target, Type } from '../event-container/event-container.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [MatIcon, NgClass, FormsModule, ReactiveFormsModule, NgFor],
  templateUrl: './filter-sidebar.component.html',
  styleUrl: './filter-sidebar.component.css'
})

export class FilterSidebarComponent {
  private clicked: boolean;
  private filter: Filter;

  @Output() filter_out = new EventEmitter<Filter>();
  
  types = Object.values(Type);
  targets = Object.values(Target);

  filterForm = new FormGroup({
    endDate: new FormControl(''),
    startDate: new FormControl(''),
    type: new FormControl(''),
    target: new FormControl('')
  })

  constructor(){
    this.clicked = false;
    this.filter = new Filter();
  }

  public submitFilters(){
    this.filter.type = this.filterForm.value.type as Type;
    this.filter.target = this.filterForm.value.target as Target;
    this.filter.startdate = new Date(Date.parse(this.filterForm.value.startDate as string));
    this.filter.endDate = new Date(Date.parse(this.filterForm.value.endDate as string));
    console.log(this.filter.startdate.toDateString());
    this.filter_out.emit(this.filter);
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


export class Filter{
  private _name: string | undefined;
  private _startdate: Date | undefined;
  
  private _endDate: Date | undefined;
  
  private _type: Type | undefined;
  
  private _target: Target | undefined;

  constructor(name?: string, startDate?: Date, endDate?: Date, type?: Type, target?: Target){
    this._name = name;
    this._startdate = startDate;
    this._endDate = endDate;
    this._type = type;
    this._target = target;
  }

  public get name(){
    return this._name as string;
  }

  public set name(n: string){
    this._name=n;
  }
  public get startdate(){
    return this._startdate as Date;
  }
  public set startdate(value: Date) {
    this._startdate = value;
  }
  public get endDate(): Date {
    return this._endDate as Date;
  }
  public set endDate(value: Date) {
    this._endDate = value;
  }
  public get type(): Type {
    return this._type as Type;
  }
  public set type(value: Type) {
    this._type = value;
  }
  public get target(): Target {
    return this._target as Target;
  }
  public set target(value: Target) {
    this._target = value;
  }
}
