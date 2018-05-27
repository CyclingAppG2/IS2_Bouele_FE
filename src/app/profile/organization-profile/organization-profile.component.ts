import { Component, OnInit } from '@angular/core';
import { User } from '../../_models';
import { UserService, EventService } from '../../_services';
import { Router } from '@angular/router';
import swal from 'sweetalert2/dist/sweetalert2.all';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css']
})
export class OrganizationProfileComponent implements OnInit {

  user: User;
  my_events: any;
  max_pages = 1;
  current_page = 1;

  constructor(
    private userService: UserService,
    private eventService: EventService,
    private router: Router
  ) {
    this.user = this.userService.initUser();
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
    this.eventService.getPage(this.current_page)
      .subscribe(
        resp => {
          this.my_events = resp;
        }
      );
  }

}
