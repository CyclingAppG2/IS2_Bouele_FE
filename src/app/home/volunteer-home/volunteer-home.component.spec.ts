import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerHomeComponent } from './volunteer-home.component';

describe('VolunteerHomeComponent', () => {
  let component: VolunteerHomeComponent;
  let fixture: ComponentFixture<VolunteerHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
