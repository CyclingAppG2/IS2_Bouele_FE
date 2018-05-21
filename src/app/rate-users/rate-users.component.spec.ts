import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateUsersComponent } from './rate-users.component';

describe('RateUsersComponent', () => {
  let component: RateUsersComponent;
  let fixture: ComponentFixture<RateUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
