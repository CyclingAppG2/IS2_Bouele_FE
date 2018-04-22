import { Component } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../_models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-sign-in-user',
  templateUrl: './sign-in-user.component.html',
  styleUrls: ['./sign-in-user.component.css']
})
export class SignInUserComponent {

  socialAuthService: any;
  submitted = false;
  model = new User();
  error;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}


  public login() {
    this.authService
      .loginUser(this.model.email, this.model.password)
        .subscribe(
          () => this.router.navigateByUrl('/home'),
          err =>  console.error(err.message)
        );
  }

  onSubmit() {
    this.login();
  }
}
