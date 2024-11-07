import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalAreaSidebarComponent } from './personal-area-sidebar.component';

describe('PersonalAreaSidebarComponent', () => {
  let component: PersonalAreaSidebarComponent;
  let fixture: ComponentFixture<PersonalAreaSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalAreaSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalAreaSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
