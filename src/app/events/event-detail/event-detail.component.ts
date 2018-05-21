import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { EventService } from '../../_services';
import { Event } from '../../_models/';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import swal from 'sweetalert2/dist/sweetalert2.all';
import { UNITS } from '../../_lists';
import { NgbDatepickerConfig, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { MouseEvent } from '@agm/core';
import { StatisticsService } from '../../_services/statistics.service';
import { Chart } from 'chart.js';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';



const now = new Date();


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  pdfResult: any;
  pdfSrc = '/pdf-test.pdf';
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
  closeResult: string;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService,
    private _location: Location,
    private domSanitizer: DomSanitizer,
    private modalService: NgbModal
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
    this.eventService.getVoluntariesInEvent(this.event_id, format)
      .subscribe(
        voluntaries => {
          this.voluntaries_in_event = voluntaries;
          console.log(voluntaries);
          this.pdfResult = this.domSanitizer.bypassSecurityTrustResourceUrl(
            URL.createObjectURL(voluntaries)
          );
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



  getVoluntariesInEventPDF(id) {
    this.pdfResult = this.eventService.downloadPDF(id);
  }

  getRole() {
    return localStorage.getItem('role');
  }

  alreadyHappened(date) {
    // tslint:disable-next-line:prefer-const
    let today = new Date();
    return today.getTime() > date;
  }

  finishEvent(id) {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    });

    swalWithBootstrapButtons({
      title: '¿Estás seguro?',
      text: 'Si abandonas este evento probablemente hagas mucha falta',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro!',
      cancelButtonText: 'No, ¡No abandonar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        const index: number = eventArray.indexOf(event);
        console.log(index);
        if (index !== -1) {
          eventArray.splice(index, 1);
        }
        this.eventService.finishEvent(id)
        .subscribe(
          resp => {
            swalWithBootstrapButtons({
              imageHeight: 100,
              title: 'Esta bien',
              text: 'Ahora este evento ha finalizado',
              type: 'success',
              imageUrl: 'https://image.flaticon.com/icons/svg/872/872607.svg'
            });
          }
        );
      } else if (
      // Read more about handling dismissals
      result.dismiss === swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons({
        title: 'Cancelado',
        text: 'Uff, seguro no te arrepentiras',
        imageUrl: 'https://image.flaticon.com/icons/svg/42/42175.svg',
        imageHeight: 100,
        imageAlt: 'A tall image'
      });
    }
    });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}