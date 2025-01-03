import { NgClass, NgFor } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, NgModule, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Event, Target, Type } from '../event-container/event-container.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [MatIcon, FormsModule, ReactiveFormsModule, NgFor,],
  templateUrl: './filter-sidebar.component.html',
  animations: [
    trigger('slide', [
      state('open',
        style({
          transform: 'translateX(5%)'
        })
      ),
      state('closed',
        style({
          transform: 'translateX(-90%)'
        })
      ),
      transition('*=> closed', [animate('0.3s ease')]),
      transition('*=> open', [animate('0.3s ease')]),
    ])
  ],
  styleUrl: './filter-sidebar.component.css'
})

export class FilterSidebarComponent {
  private clicked: boolean;
  private filter: Filter;
  filterClicked: 'open' | 'closed' = 'closed'

  @Output() filter_out = new EventEmitter<Filter>();
  @Output() click_out = new EventEmitter();
  
  types = Object.values(Type);
  selectedType = Type.NULL;
  targets = Object.values(Target);
  selectedTarget = Target.NULL;

  event: Event = new Event();

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
    this.filter.date = new Date(Date.parse(this.filterForm.value.startDate as string));
    this.filter.endDate = new Date(Date.parse(this.filterForm.value.endDate as string));
    console.log(this.filter.date.toDateString());
    this.filter_out.emit(this.filter);
  }
 
  public resetFilter(){
    this.filterForm.reset();  
  }
  public onClick(){
    this.click_out.emit();
  }

  public get isClicked(){
    return this.clicked;
  }

  public set isClicked(b: boolean){
    this.clicked = b;
  }
}


export class Filter{
  private _name: string;
  private _startdate: Date;
  
  private _endDate: Date;
  
  private _type: Type;
  
  private _target: Target;

  constructor(name?: string, startDate?: Date, endDate?: Date, type?: Type, target?: Target){
    this._name = name ? name : '';
    this._startdate = startDate ? startDate : new Date('');
    this._endDate = endDate ? endDate : new Date('');;
    this._type = type ? type : Type.NULL;
    this._target = target ? target : Target.NULL;
  }

  public get name(){
    return this._name as string;
  }

  public set name(n: string){
    this._name=n;
  }
  public get date(){
    return this._startdate as Date;
  }
  public set date(value: Date) {
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
