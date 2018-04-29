import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntaryProfileComponent } from './voluntary-profile.component';

describe('VoluntaryProfileComponent', () => {
  let component: VoluntaryProfileComponent;
  let fixture: ComponentFixture<VoluntaryProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoluntaryProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoluntaryProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
