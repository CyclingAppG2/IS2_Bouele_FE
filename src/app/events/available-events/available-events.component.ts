import { Component, OnInit } from '@angular/core';
import { EventService } from '../../_services';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import swal from 'sweetalert2';

@Component({
  selector: 'app-available-events',
  templateUrl: './available-events.component.html',
  styleUrls: ['./available-events.component.css']
})
export class AvailableEventsComponent implements OnInit {

  public default_image: '/assets/images/default-cap.svg';
  public available_events: any;
  public loading = true;
  private API_URL = environment.apiUrl;


  constructor(
    private eventService: EventService,
    private _sanitizer: DomSanitizer
  ) {
    this.eventService.getAvailableEvents()
      .subscribe(
        events => {
          this.available_events = events;
          this.loading = false;
        }
      );
  }

  ngOnInit() {
  }

  public getImages(uri) {
    const images = [];
    const url_base = decodeURIComponent(uri).split('[')[0];
    const image = decodeURIComponent(uri).split('[')[1].split(',');
    image.forEach(element => {
      images.push(
        this.API_URL + url_base + element.split('"')[1]
      );
    });
    return images;
  }

  public getBackground(image) {
    return image ? this._sanitizer
      .bypassSecurityTrustStyle(`url(${image})`) : this._sanitizer
        .bypassSecurityTrustStyle(`url(` + this.default_image + `)`);
  }

  public receiveEvents($event) {
    this.available_events = $event;
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

}
