import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService, EventService } from '../../_services';
import { Router } from '@angular/router';
import { User } from '../../_models';
import swal from 'sweetalert2/dist/sweetalert2.js';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-voluntary-profile',
  templateUrl: './voluntary-profile.component.html',
  styleUrls: ['./voluntary-profile.component.css']
})

export class VoluntaryProfileComponent implements OnInit {
  API_URL = environment.apiUrl;
  private default_image = '/assets/images/default-cap.svg';
  public max_pages = 1;
  public current_page = 1;
  user;
  my_events: any;
  public loading = true;

  constructor(
    private authService: AuthenticationService,
    private eventService: EventService,
    private router: Router,
    private _sanitizer: DomSanitizer
  ) {
    this.authService.getTypeOfUser()
      .subscribe(
        resp => {
          this.authService.getUserInfo()
            .subscribe(
              info => {
                // tslint:disable-next-line:prefer-const
                let user_data_id = JSON.parse(JSON.stringify(resp)).data.user_data_id;
                // tslint:disable-next-line:prefer-const
                let type_of_user = JSON.parse(JSON.stringify(resp)).data.user_data_type;
                this.authService.getUserDataInfo(type_of_user, user_data_id)
                  .subscribe(
                    dataInfo => {
                      this.user = {
                        type: JSON.parse(JSON.stringify(resp)).data.user_data_type,
                        user: {
                          email: JSON.parse(JSON.stringify(info)).data.email,
                          name: JSON.parse(JSON.stringify(info)).data.name,
                          username: JSON.parse(JSON.stringify(info)).data.username,
                          image: JSON.parse(JSON.stringify(info)).data.image,
                          points_day: JSON.parse(JSON.stringify(info)).data.points_day
                        },
                        data: {
                          birthday: JSON.parse(JSON.stringify(dataInfo)).birthday,
                          cellphone: JSON.parse(JSON.stringify(dataInfo)).cellphone,
                          gender: JSON.parse(JSON.stringify(dataInfo)).gender,
                          theme_interests: JSON.parse(JSON.stringify(dataInfo)).theme_interests,
                          voluntary_score: JSON.parse(JSON.stringify(dataInfo)).voluntary_score
                        }
                      };
                    }
                  );
              }
            );
        }
      );
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
          this.loading= false;
        }
      );
  }

  ngOnInit() {

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
        console.log(index);
        if (index !== -1) {
          eventArray.splice(index, 1);
        }
        this.eventService.leaveEvent(event.id)
          .subscribe(
            resp => {
              console.log(resp);
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

  public getAvatar(url) {
    return url ? this.API_URL + url : '/assets/images/user-default.svg';
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

  getBackground(image) {
    return image ? this._sanitizer
      .bypassSecurityTrustStyle(`url(${image})`) : this._sanitizer
        .bypassSecurityTrustStyle(`url(` + this.default_image + `)`);
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

}
