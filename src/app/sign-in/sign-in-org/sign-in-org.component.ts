import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-sign-in-org',
  templateUrl: './sign-in-org.component.html',
  styleUrls: ['./sign-in-org.component.css']
})
export class SignInOrgComponent {

  submitted = false;
  model = new User();

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}


  public login() {
    this.authService
      .login()
      .subscribe(() => this.router.navigateByUrl('/home'));
  }

  onSubmit() {
    this.login();
  }
}
