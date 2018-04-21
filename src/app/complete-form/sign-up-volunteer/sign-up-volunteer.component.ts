import { Component, OnInit } from '@angular/core';
import { CITIES, GENDERS } from '../../_lists';
import { Volunteer } from '../../_models/volunteer.model';
import { AuthenticationService } from '../../_services/authentication';
import { Router, RouterLink } from '@angular/router';

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
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.signUpVoluntary(this.voluntary)
      .subscribe(
        () => this.router.navigateByUrl('/home')
      );
  }

}
