import { Component } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../_models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { UserService } from '../../_services';
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
    private authService: AuthenticationService,
    private userService: UserService
  ) {}


  public login() {
    this.authService
      .loginUser(this.model.email, this.model.password)
        .subscribe(
          () => {
            const route = this.userService.goHome();
            this.router.navigateByUrl(route);
            swal({
              title: '¡Bienvenido!',
              text: localStorage.getItem('name'),
              type: 'success',
              showConfirmButton: false,
              timer: 1500
            });
          },
          err =>  console.log(err.error.errors)
        );
  }

  onSubmit() {
    this.login();
  }
}
