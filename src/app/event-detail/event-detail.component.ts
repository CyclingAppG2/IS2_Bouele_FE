import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EventService } from '../_services';
import { Event } from '../_models/';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event_id = +this.route.snapshot.paramMap.get('id');
  event: any;
  eventForm: FormGroup;
  markers = [];
  lat: any;
  lng: any;
  zoom: number;

  name;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    console.log(this.getEventById());
    console.log(this.name);
  }

  ngOnInit() {
  }

  public getEventById() {
    this.eventService.getEventById(this.event_id)
      .subscribe(
        resp => {
          this.event = resp;
          console.log(resp);
          console.log(this.event);
          return resp;
        }, err => {
          console.log(err);
        }
      );
    console.log(this.event);
  }

  createForm() {
    console.log(this.event);
    this.eventForm = this.formBuilder.group(
      {
        name: [this.event.name, Validators.required],
        description: [this.event.name, Validators.required],
        date: [this.event.name, Validators.required],
        duration: [this.event.name, [Validators.required, Validators.min(0)]],
        unidades: [this.event.name, Validators.required],
        max_voluntaries: [this.event.name, [Validators.required, Validators.min(0)]],
        locations_describe: this.formBuilder.array([]),
        plusses: this.formBuilder.array([])
      });
  }

  get locationsDescribes(): FormArray {
    return this.eventForm.get('locations_describe') as FormArray;
  }

  get plusses(): FormArray {
    return this.eventForm.get('plusses') as FormArray;
  }

}
