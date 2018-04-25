import { Component, OnInit } from '@angular/core';
import { map } from '../_utils/rxjs.util';
import { Router } from '@angular/router';
import { UserService, AuthenticationService } from '../_services';
import swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  name: string;

  constructor(
    private router: Router,
    private dataService: UserService,
    private authService: AuthenticationService
  ) {}

  isLogged() {
    this.name = localStorage.getItem('name');
    return !!localStorage.getItem('access-token');
  }

  onLogout() {
    this.authService.logout()
      .subscribe(
        () => {
          swal({
            title: 'Adios',
            text: 'Te esperamos de vuelta',
            type: 'success',
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigateByUrl('');
      }
    )
  }
}
