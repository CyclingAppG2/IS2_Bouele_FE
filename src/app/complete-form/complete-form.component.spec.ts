import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteFormComponent } from './complete-form.component';

describe('CompleteFormComponent', () => {
  let component: CompleteFormComponent;
  let fixture: ComponentFixture<CompleteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
