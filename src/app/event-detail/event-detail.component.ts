import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EventService } from '../_services';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event: any;
  eventForm: FormGroup;
  markers = [];
  lat: any;
  lng: any;
  zoom: number;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.eventService.getEventById(id)
      .subscribe(
        event => {
          this.event = event;
          console.log(this.event);
        }, err => {
          console.error(err);
        }
      );
      console.log(this.event);

    this.createForm();

  }

  ngOnInit() {
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
