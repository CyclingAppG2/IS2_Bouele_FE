import { Component } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../_models/user.model';
@Component({
  selector: 'app-sign-in-user',
  templateUrl: './sign-in-user.component.html',
  styleUrls: ['./sign-in-user.component.css']
})
export class SignInUserComponent {

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
