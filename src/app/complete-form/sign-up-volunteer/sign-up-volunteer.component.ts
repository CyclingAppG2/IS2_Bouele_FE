import { Component, OnInit } from '@angular/core';
import { CITIES, GENDERS } from '../../_lists';
import { Volunteer } from '../../_models/volunteer.model';
import { AuthenticationService } from '../../_services/authentication';
import { Router, RouterLink } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up-volunteer',
  templateUrl: './sign-up-volunteer.component.html',
  styleUrls: ['./sign-up-volunteer.component.css']
})
export class SignUpVolunteerComponent implements OnInit {
  cities = CITIES;
  genders = GENDERS;
  voluntary = new Volunteer();
  minDate = { year: 1900, month: 1, day: 1 };
  maxDate = { year: 2017, month: 12, day: 31 };

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.authService.signUpVoluntary(this.voluntary)
    .subscribe(
      resp => {
      swal({
        title: 'Has completado tu registro',
        text: 'Ahora empieza a compartir y disfrutar',
        type: 'success',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigateByUrl('/home');
    }, err => {
      swal({
        type: 'error',
        title: 'Opsss...',
        text: 'Algo ha salido mal ' + err.message
      });
      console.log(err);
    }
  );

  this.authService.completeSignUp(
    localStorage.getItem('user-id'),
    localStorage.getItem('user-data-id') ,
    'Voluntary')
    .subscribe(
      () => {},
      err => console.error(err)
    );

  }
}
