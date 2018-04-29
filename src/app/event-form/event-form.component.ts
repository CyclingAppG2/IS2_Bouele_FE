import { Component, OnInit } from '@angular/core';
import { Event } from '../_models/event.model';
import { EventService } from '../_services';
import { Router } from '@angular/router';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})

export class EventFormComponent implements OnInit {

  model = new Event();
  minDate = { year: 2018, month: 1, day: 1 };
  maxDate = { year: 2029, month: 12, day: 31 };
  markers = [];
  zoom = 15;
  lng: any;
  lat: any;

  constructor(private eventService: EventService, private router: Router) {
    if (navigator) {
    navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
  }

  ngOnInit() {}

  onSubmit() {
    this.eventService.newEvent(this.model).subscribe(
      resp => {
        console.log(resp);
      },
      err => {
        console.log(err);
      }
    );
  }


  mapClicked($event: MouseEvent) {
    if (this.markers.length < 1) {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: true
      });
    }


  }
}


interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

