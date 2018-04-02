import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpOrgComponent } from './sign-up-org.component';

describe('SignUpOrgComponent', () => {
  let component: SignUpOrgComponent;
  let fixture: ComponentFixture<SignUpOrgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
