import { Component, OnInit } from '@angular/core';
import { Event } from '../_models/event.model';
@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {

  model = new Event();
  minDate = { year: 2018, month: 1, day: 1 };
  maxDate = { year: 2029, month: 12, day: 31 };
  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }

}
