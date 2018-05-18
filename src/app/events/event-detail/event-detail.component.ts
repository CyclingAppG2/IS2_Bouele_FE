import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EventService } from '../../_services';
import { Event } from '../../_models/';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import swal from 'sweetalert2';
import { UNITS } from '../../_lists';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MouseEvent } from '@agm/core';


const now = new Date();


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event_id = +this.route.snapshot.paramMap.get('id');
  event: any;
  eventDetailForm: FormGroup;
  voluntaries_in_event: any;
  units = UNITS;
  lat: number;
  lng: number;
  editing = false;
  unidades;
  minDate = { year: 2018, month: 1, day: 1 };
  maxDate = { year: 2029, month: 12, day: 31 };
  eventDate;
  markers: Marker[] = [];

    // lineChart
    public lineChartData: Array<any> = [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
    ];
    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions: any = {
      responsive: true
    };
    public lineChartColors: Array<any> = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
    public lineChartLegend = true;
    public lineChartType = 'line';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService,
    private _location: Location,
  ) {
    this.eventService.getEventById(this.event_id)
      .subscribe(
        resp => {
          this.event = resp;
          console.log(this.event);
          this.eventDetailForm = this.formBuilder.group({
            name: [''],
            description: [''],
            date: [''],
            duration: [''],
            unidades: [''],
            images: [''],
            max_voluntaries: [''],
            locations: [''],
            locations_describe: this.formBuilder.array([]),
            plusses: this.formBuilder.array([])
          });
          console.log(resp.locations);
          resp.locations.forEach(location => {
            console.log(location);
            this.markers.push({
              lat: location.latitude,
              lng: location.longitude,
              draggable: true
            });
          });
          this.eventDate = new Date(resp.start_datetime);
        }, err => {
          console.log(err);
          swal({
            title: 'Opss...',
            text: 'Algo ha ocurrido, quiza el evento no exista' + err,
            type: 'error'
          });
          this._location.back();
        }
      );
    this.eventService.getVoluntariesInEvent(this.event_id, 'json')
      .subscribe(
        voluntaries => {
          this.voluntaries_in_event = voluntaries;
        }
      );

    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }

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


  getVoluntariesInEvent(format: string) {
    this.eventService.getVoluntariesInEvent(this.event_id, format )
      .subscribe(
        voluntaries => {
          this.voluntaries_in_event = voluntaries;
          console.log(voluntaries);
        }
      );
  }

  createForm() {
    console.log(this.event);
    this.eventDetailForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  get locationsDescribes(): FormArray {
    return this.eventDetailForm.get('locations_describe') as FormArray;
  }

  get plusses(): FormArray {
    return this.eventDetailForm.get('plusses') as FormArray;
  }

  public applyToEvent() {
    console.log(this.event.id);
    this.eventService.applyToEvent(this.event.id)
      .subscribe(
        data => {
          swal({
            title: 'Genial, MANOS A LA OBRA',
            text: '¡Ahora haces parte de este evento!'
          });
        }
      );
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }

  markerDragEnd(m: Marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }



  public randomize(): void {
    const _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = { data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label };
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }


}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}
