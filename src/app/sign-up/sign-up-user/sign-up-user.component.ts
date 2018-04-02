import { Component } from '@angular/core';

import { User } from '../../_models/user.model';
import { GENDERS, CITIES } from '../../_lists/index';

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.css']
})
export class SignUpUserComponent {
  cities = CITIES;
  genders = GENDERS;
  model = new User();
  submitted = false;
  minDate = { year: 1900, month: 1, day: 1 };
  maxDate = { year: 2017, month: 12, day: 31 };



  onSubmit() {
    this.submitted = true;
  }

}
