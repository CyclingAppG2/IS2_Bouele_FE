import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MouseEvent } from '@agm/core';
import { UNITS } from '../../_lists';
import { Event, Location as Loc } from '../../_models';
import { EventService, AuthenticationService } from '../../_services';
import { Router } from '@angular/router';
import { AmazingTimePickerService } from 'amazing-time-picker';
@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})

export class EventFormComponent implements OnInit {


  public events: any;
  public organization_id;
  public error: any;
  public eventForm: FormGroup;
  public unidades: any;
  public units = UNITS;
  public minDate = { year: 2018, month: 1, day: 1 };
  public maxDate = { year: 2029, month: 12, day: 31 };
  public urls = new Array<string>();
  public files: File[];
  public markers = [];
  public zoom = 15;
  public lng: any;
  public lat: any;
  public selectedTime: any;



  constructor(
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private authService: AuthenticationService,
    private router: Router,
    private atp: AmazingTimePickerService
  ) {
    this.createForm();
    this.authService.getDataId()
    .subscribe(
      data => {
        this.organization_id = JSON.parse(JSON.stringify(data)).data.user_data_id;
      }
    );
  }

  ngOnInit() {


  }

  open() {
    const amazingTimePicker = this.atp.open({
        time:  this.selectedTime,
        theme: 'material-orange',

    });
    amazingTimePicker.afterClose().subscribe(time => {
        this.selectedTime = time;
    });
}

  createForm() {
    if (navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
    this.eventForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        description: ['', Validators.required],
        date: ['', Validators.required],
        duration: ['', [Validators.required, Validators.min(0)]],
        unidades: ['', Validators.required],
        images: [this.files],
        max_voluntaries: ['', [Validators.required, Validators.min(0)]],
        locations: [this.markers],
        locations_describe: this.formBuilder.array([]),
        plusses: this.formBuilder.array([])
      });
  }

  showerPreviewImages(event) {
    const files = event.target.files;
    this.files = Array.from(files);
    if (files) {
      // tslint:disable-next-line:prefer-const
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }


  toEmptyUrls(array: Array<string>) {
    console.log(array);
    array.forEach(element => {
      array.splice(element.indexOf(element));
    });
    console.log(array);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
    this.addLocationDescribe();
  }

  get locationsDescribes(): FormArray {
    return this.eventForm.get('locations_describe') as FormArray;
  }


  addLocationDescribe() {
    this.locationsDescribes.push(
      this.formBuilder.group(
        {
          person_name: [''],
          label: [''],
          email: ['', [Validators.email]]
        }
      )
    );
  }

  get plusses(): FormArray {
    return this.eventForm.get('plusses') as FormArray;
  }

  addPLusses() {
    this.plusses.push(
      this.formBuilder.group(
        {
          plus_name: ['']
        }
      )
    );
  }

  deletePlusses(index: number) {
    const control = <FormArray>this.eventForm.controls['plusses'];
    control.removeAt(index);
  }

  calculateDurationOnMinutes() {
    let duration = this.eventForm.value.duration;
    switch (this.unidades) {
      case 'M':
        duration = duration;
        break;
      case 'H':
        duration = duration * 60;
        break;
      case 'D':
        duration = duration * 1440;
        break;
      case 'S':
        duration = duration * 1440 * 7;
        break;
      case 'MM':
        duration = duration * 1440 * 7 * 4;
        break;
      default:
        break;
    }
    this.eventForm.value.duration = duration;
  }

  formatEvent() {
    this.calculateDurationOnMinutes();
    const plusses = [];
    for (let index = 0; index < this.eventForm.value.plusses.length; index++) {
      plusses.push(this.eventForm.value.plusses[index].plus_name);
    }
    return {
      event: {
        name: this.eventForm.value.name,
        description: this.eventForm.value.description,
        duration: this.eventForm.value.duration,
        start_datetime: this.formatDate(this.eventForm.value.date),
        organization_id: localStorage.getItem('user-data-id'),
        max_voluntaries: this.eventForm.value.max_voluntaries,
        locations: this.getFormatedLocations(),
        plus: plusses,
        files: this.files
      }
    };
  }

  getFormatedLocations() {
    const locations = [];
    for (let index = 0; index < this.eventForm.value.locations.length; index++) {
      locations.push(
        {
          lat: this.eventForm.value.locations[index].lat,
          lng: this.eventForm.value.locations[index].lng,
          person_name: this.eventForm.value.locations_describe[index].person_name,
          label: this.eventForm.value.locations_describe[index].label,
          email: this.eventForm.value.locations_describe[index].email,
        }
      );

    }
    return locations;
  }

  formatDate(fecha: any): number {
    const date = new Date(fecha.month +  '/' + fecha.day + '/' + fecha.year + ' ' + this.selectedTime).getTime();
    console.log(date);
    return date;
  }



  findInvalidControls() {
    const invalid = [];
    const controls = this.eventForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  onSubmit() {
    this.eventService.newEvent(this.formatEvent()).subscribe(
      resp => {
        this.router.navigateByUrl('event-detail/' + resp.id);
      },
      err => {
        this.error = err.error;
      }
    );

  }





  /* public myForm: FormGroup;
  model = new Event();
  minDate = { year: 2018, month: 1, day: 1 };
  maxDate = { year: 2029, month: 12, day: 31 };
  markers = [];
  zoom = 15;
  lng: any;
  lat: any;
  urls = new Array<string>();
  metrics: string;

  locationForm: FormGroup;

  constructor(private eventService: EventService, private router: Router,  private formBuilder: FormBuilder) {
    if (navigator) {
    navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
  }

  ngOnInit() {

  }





  onSubmit() {
    this.model.location = this.markers;
    let duration = 0;
    switch (this.metrics) {
      case 'M':
        duration = this.model.duration;
        break;
      case 'H':
        duration = this.model.duration * 60;
        break;
      case 'D':
        duration = this.model.duration * 1440;
        break;
      default:
        break;
    }
    this.model.duration = duration;
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
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: true
      });
  }



  showerPreviewImages(event) {
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  toEmptyUrls(array: Array<string>) {
    array.forEach(element => {
      array.splice(element.indexOf(element));
    });
  } */
}


interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

