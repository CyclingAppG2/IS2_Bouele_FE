import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInOrgComponent } from './sign-in-org.component';

describe('SignInOrgComponent', () => {
  let component: SignInOrgComponent;
  let fixture: ComponentFixture<SignInOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
