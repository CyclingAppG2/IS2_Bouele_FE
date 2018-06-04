import { Component } from '@angular/core';
import { AuthenticationService } from '../../../_services/authentication/authentication.service';
import { Router } from '@angular/router';
import { User } from '../../../_models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { UserService } from '../../../_services';
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
  ) { }


  public login() {
    this.authService
      .loginUser(this.model.email, this.model.password)
      .subscribe(
        resp => {
          swal({
            title: '¡Bienvenido!',
            text: localStorage.getItem('name'),
            type: 'success',
            showConfirmButton: false,
            timer: 1500
          });
        },
        (err: HttpErrorResponse) => {
          if (JSON.parse(JSON.stringify(err)).errors !== undefined || JSON.parse(JSON.stringify(err)).errors !== null) {
            console.error('An error occurred:', JSON.parse(JSON.stringify(err)).errors);
            this.error = JSON.parse(JSON.stringify(err)).errors;
          } else {
            console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
            swal({
              type: 'error',
              title: 'Sin conexión',
              text: 'No hemos podido establecer conexión con el servidor, intenta más tarde'
            });
          }

        });
  }

  onSubmit() {
    this.login();
  }
}
