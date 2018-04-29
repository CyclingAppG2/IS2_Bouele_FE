import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpVolunteerComponent } from './sign-up-volunteer.component';

describe('SignUpVolunteerComponent', () => {
  let component: SignUpVolunteerComponent;
  let fixture: ComponentFixture<SignUpVolunteerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpVolunteerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
