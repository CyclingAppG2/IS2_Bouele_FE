import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService, EventService } from '../../_services';
import { Router } from '@angular/router';
import { User } from '../../_models';
import swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-voluntary-profile',
  templateUrl: './voluntary-profile.component.html',
  styleUrls: ['./voluntary-profile.component.css']
})
export class VoluntaryProfileComponent implements OnInit {

  user: User;
  my_events: any;

  constructor(
    private userService: UserService,
    private eventService: EventService,
    private router: Router
  ) {
    this.user = this.userService.initUser();
  }

  ngOnInit() {
    this.eventService.getMyEvents()
      .subscribe(
        data => {
          this.my_events = data;
        }
      );
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


}
