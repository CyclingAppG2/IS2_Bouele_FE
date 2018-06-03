import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { map } from '../../_utils/rxjs.util';
import { Router } from '@angular/router';
import { UserService, AuthenticationService } from '../../_services';
import swal from 'sweetalert2';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/takeWhile';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  API_URL = environment.apiUrl;
  home_url: any;
  name: string;
  image_url: string;
  isLogged = false;

  constructor(
    private router: Router,
    private dataService: UserService,
    private authService: AuthenticationService
  ) {
    if (localStorage.getItem('access-token') !== null && localStorage.getItem('access-token') !== undefined) {
      this.authService.validateToken()
        .subscribe(
          resp => {
            this.isLogged = true;
            this.image_url = JSON.parse(JSON.stringify(resp)).data.image.url;
            this.name = JSON.parse(JSON.stringify(resp)).data.name;
          }, err => {
            this.isLogged = false;
            this.authService.logout().subscribe(() => console.log('Has cerrado sesión'));
          }
        );
    } else {
      this.isLogged = false;
    }
  }

  ngOnInit() {
    this.utcTime();
  }


  getImage() {
    if (localStorage.getItem('access-token') !== null || localStorage.getItem('access-token') !== undefined) {
      this.authService.validateToken()
        .subscribe(
          resp => {
            this.image_url = JSON.parse(JSON.stringify(resp)).data.image.url;
          }
        );
    }

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
      );
  }

  goHome() {
    const role = localStorage.getItem('role');
    console.log(role);
    switch (role) {
      case 'Voluntary':
        this.router.navigateByUrl('voluntary-home');
        break;
      case 'Administrator':
        this.router.navigateByUrl('administrator-home');
        break;
      case 'Organization':
        this.router.navigateByUrl('organization-home');
        break;
      default:
        break;

    }
  }

  goProfile() {
    const role = localStorage.getItem('role');
    console.log(role);
    switch (role) {
      case 'Voluntary':
        this.router.navigateByUrl('voluntary-profile');
        break;
      case 'Administrator':
        this.router.navigateByUrl('administrator-profile');
        break;
      case 'Organization':
        this.router.navigateByUrl('organization-profile');
        break;
      default:
        break;

    }
  }

  public getAvatar() {
    return this.image_url ? (this.API_URL + this.image_url) : '/assets/images/user-default.svg';
  }

  utcTime(): void {
    setInterval(() => {
      if (localStorage.getItem('access-token') !== null && localStorage.getItem('access-token') !== undefined) {
        this.authService.validateToken()
          .subscribe(
            resp => {
              this.isLogged = true;
              this.image_url = JSON.parse(JSON.stringify(resp)).data.image.url;
              this.name = JSON.parse(JSON.stringify(resp)).data.name;
            }, err => {
              this.isLogged = false;
              this.authService.logout().subscribe(() => console.log('Has cerrado sesión'));
            }
          );
      } else {
        this.isLogged = false;
      }
    }, 30000);
  }
}
