import { Component, OnInit } from '@angular/core';
import { User } from '../../_models';
import { UserService, EventService, AuthenticationService } from '../../_services';
import { Router } from '@angular/router';
import swal from 'sweetalert2/dist/sweetalert2.all';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css']
})
export class OrganizationProfileComponent implements OnInit {

  public user;
  public my_events: any;
  public max_pages = 1;
  public current_page = 1;
  API_URL = environment.apiUrl;


  constructor(
    private authService: AuthenticationService,
    private eventService: EventService,
    private router: Router
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
                          NIT: JSON.parse(JSON.stringify(dataInfo)).NIT,
                          branches: JSON.parse(JSON.stringify(dataInfo)).branches,
                          category: JSON.parse(JSON.stringify(dataInfo)).category,
                          firm: JSON.parse(JSON.stringify(dataInfo)).firm,
                          mainaddress: JSON.parse(JSON.stringify(dataInfo)).mainaddress,
                          minicipality: JSON.parse(JSON.stringify(dataInfo)).minicipality,
                          organization_category: JSON.parse(JSON.stringify(dataInfo)).organization_category,
                          organization_score: JSON.parse(JSON.stringify(dataInfo)).organization_score
                        }
                      };
                    }
                  );
              }
            );
        }
      );
    this.eventService.getMyEvents()
    .subscribe(
      data => {
        this.my_events = data;
      }
    );
    this.eventService.getPaginationMaxPage()
      .subscribe(
        resp => {
          this.max_pages = <number>resp;
        }
      );
  }

  ngOnInit() {

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
        console.log(index);
        if (index !== -1) {
          eventArray.splice(index, 1);
        }
        this.eventService.deleteEvent(event.id)
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

  public getPage() {
    this.my_events = null;
    this.eventService.getPage(this.current_page)
      .subscribe(
        resp => {
          this.my_events = resp;
        }
      );
  }

  public getAvatar(url) {
    return url ? this.API_URL + url : '/assets/images/user-default.svg';
  }

}
