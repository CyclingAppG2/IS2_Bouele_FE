import { Component, OnInit } from '@angular/core';
import { UserService, EventService } from '../../_services';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import {NgbAccordionConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-volunteer-home',
  templateUrl: './volunteer-home.component.html',
  styleUrls: ['./volunteer-home.component.css']
})
export class VolunteerHomeComponent implements OnInit {

  public events: any;
  default_cap_circle = '/assets/images/default-image-cap.png';
  max_pages = 1;
  current_page;
  htmlContent;
  public loading = true;

  constructor(
    private eventService: EventService,
    private router: Router,
    private config: NgbAccordionConfig
  ) {
    config.type = 'info';
    this.eventService.getAvailableEvents()
      .subscribe(
        events => {
          this.events = events;
          this.loading = false;
        }
      );
  }

  onScroll() {
  }

  ngOnInit() {

  }

  public getEventImage(image) {
    if (image === undefined || image === null) {
      return this.default_cap_circle;
    } else {
      return image.url;
    }
  }

  public applyToEvent(eventArray, eventID) {
    this.eventService.applyToEvent(eventID)
      .subscribe(
        data => {
          swal({
            title: 'Genial, MANOS A LA OBRA',
            text: '¡Ahora haces parte de este evento!'
          }).then((result) => {
            if (result.value) {
              const index: number = eventArray.indexOf(eventID) + 1;
              if (index !== -1) {
                eventArray.splice(index, 1);
              }
            }
          });
        }
      );
  }

  public receiveEvents($event) {
    this.events = $event.subscribe(
      resp => {
        this.loading = false;
      }
    );
  }

  public getPage() {

  }



}
