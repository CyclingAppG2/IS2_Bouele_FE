import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { EventService } from '../../_services';
import swal from 'sweetalert2/dist/sweetalert2.all';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {

  public my_events: any;
  public loading = true;
  public max_pages = 1;
  public current_page = 1;
  private API_URL = environment.apiUrl;
  private default_image = '/assets/images/default-cap.svg';
  public role = localStorage.getItem('role');

  constructor(
    private eventService: EventService,
    private _sanitizer: DomSanitizer
  ) {
    this.eventService.getPaginationMaxPage()
      .subscribe(
        resp => {
          this.max_pages = <number>resp;
        }
      );
    this.eventService.getMyEvents()
      .subscribe(
        data => {
          this.my_events = data;
          this.loading = false;
        }
      );
  }

  ngOnInit() {
  }

  public getPage() {
    this.my_events = null;
    this.loading = true;
    this.eventService.getPage(this.current_page)
      .subscribe(
        resp => {
          this.my_events = resp;
          this.loading = false;
        }
      );
  }

  public deleteEvent(eventArray, event) {
    const swalWithBootstrapButtons = swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    });

    swalWithBootstrapButtons({
      title: '¿Estás seguro?',
      text: 'Los voluntarios inscritos podrían calificarte mal',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro!',
      cancelButtonText: 'No, ¡No borrar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        const index: number = eventArray.indexOf(event);
        if (index !== -1) {
          eventArray.splice(index, 1);
        }
        this.eventService.deleteEvent(event.id)
          .subscribe(
            resp => {
            }
          );
        swalWithBootstrapButtons({
          imageHeight: 100,
          title: 'Tristemente',
          text: 'Has abandonado este evento',
          imageUrl: 'https://image.flaticon.com/icons/svg/872/872607.svg'
        });
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

  public getImageCap(url) {
    return url ? this.API_URL + url : '/assets/images/default-cap.svg';
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

  public leaveEvent(eventArray, event) {
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
        if (index !== -1) {
          eventArray.splice(index, 1);
        }
        this.eventService.leaveEvent(event.id)
          .subscribe(
            resp => {
            }
          );
        swalWithBootstrapButtons({
          imageHeight: 100,
          title: 'Tristemente',
          text: 'Has abandonado este evento',
          imageUrl: 'https://image.flaticon.com/icons/svg/872/872607.svg'
        });
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
    /*     */
  }

}
