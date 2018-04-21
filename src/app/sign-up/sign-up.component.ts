import { Component, OnInit } from '@angular/core';
import { CITIES, GENDERS } from '../_lists';
import { User } from '../_models/user.model';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  user = new User() ;
  submitted = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}


  public signUpUser() {
    this.authService
      .signUpUser(this.user)
      .subscribe(() => this.router.navigateByUrl('/complete-form'),
     err => {
       console.error(err.status);
     });

  }

  onSubmit() {
    this.signUpUser();
  }

}
