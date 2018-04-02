import { Component } from '@angular/core';
import { GENDERS, CITIES, CATEGORIES } from '../../_lists/index';
import { Organization } from '../../_models/organization.model';

@Component({
  selector: 'app-sign-up-org',
  templateUrl: './sign-up-org.component.html',
  styleUrls: ['./sign-up-org.component.css']
})
export class SignUpOrgComponent {

  cities = CITIES;
  genders = GENDERS;
  categories = CATEGORIES;

  model = new Organization();

  submitted = false;

  minDate = { year: 1900, month: 1, day: 1 };
  maxDate = { year: 2017, month: 12, day: 31 };

  onSubmit() {
    this.submitted = true;
  }


}
