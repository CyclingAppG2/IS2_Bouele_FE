import { Component, OnInit } from '@angular/core';
import { map } from '../_utils/rxjs.util';
import { Router } from '@angular/router';
import { UserService, AuthenticationService } from '../_services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private router: Router,
    private dataService: UserService,
    private authService: AuthenticationService
  ) {}

  isLogged() {
    return !!localStorage.getItem('access-token');
  }

  onLogout() {
    this.authService.logout()
      .subscribe(
        () => this.router.navigateByUrl('')
      );
  }
}
