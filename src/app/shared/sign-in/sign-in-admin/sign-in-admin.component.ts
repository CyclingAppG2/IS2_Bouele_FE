import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../_services';
import { User } from '../../../_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-admin',
  templateUrl: './sign-in-admin.component.html',
  styleUrls: ['./sign-in-admin.component.css']
})
export class SignInAdminComponent {

  model = new User();

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }


  login() {
    this.authService
    .loginAdmin(this.model.email, this.model.password)
    .subscribe(() => this.router.navigateByUrl('/administrator-home'));
  }
}
