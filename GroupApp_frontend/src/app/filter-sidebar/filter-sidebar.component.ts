import { NgClass, NgFor } from '@angular/common';
import { booleanAttribute, Component, EventEmitter, NgModule, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Event, Target, Type } from '../event-container/event-container.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LinkingService } from '../services/linking/linking.service';
import { start } from 'repl';


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

  filterForm: FormGroup

  constructor(private linkingService: LinkingService,  private fb: FormBuilder) {
    this.clicked = false;
    this.filter = new Filter();
    this.filterForm = this.fb.group({
          startDate: ['', Validators.required],
          place: ['', Validators.required],
          target: ['', Validators.required],
          type: ['', Validators.required],
          price: [0, [Validators.required, Validators.min(0)]],
      });
  }

  public submitFilters(){
    this.filter.type = this.filterForm.value.type as Type;
    this.filter.target = this.filterForm.value.target as Target;
    const startDateValue = this.filterForm.value.startDate as string;
    this.filter.date = startDateValue ? new Date(Date.parse(startDateValue)) : new Date();
    this.linkingService.updateFilters(this.filter);
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
  private _price: number;
  private _type: Type;
  private _target: Target;

  constructor(name?: string, startDate?: Date, price?: number, type?: Type, target?: Target){
    this._name = name ? name : '';
    this._startdate = startDate ? startDate : new Date();
    this._price = price ? price : 0;
    this._type = type ? type : Type.NULL;
    this._target = target ? target : Target.NULL;
  }

  public get name(){
    return this._name as string;
  }

  public set name(n: string){
    this._name=n;
  }

  public get price(): number {
    return this._price;
  }
  public set price(value: number) {
    this._price = value;
  }
  public get date(){
    return this._startdate as Date;
  }
  public set date(value: Date) {
    this._startdate = value;
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
