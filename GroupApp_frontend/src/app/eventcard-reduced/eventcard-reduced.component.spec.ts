import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventcardReducedComponent } from './eventcard-reduced.component';

describe('EventcardReducedComponent', () => {
  let component: EventcardReducedComponent;
  let fixture: ComponentFixture<EventcardReducedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventcardReducedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventcardReducedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
