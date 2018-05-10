import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { map } from '../_utils/rxjs.util';
import { Router } from '@angular/router';
import { UserService, AuthenticationService } from '../_services';
import swal from 'sweetalert2';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  home_url: any;
  name: string;
  image_url: string;
  @ViewChild('avatar') image: ElementRef;

  constructor(
    private router: Router,
    private dataService: UserService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getImage();
  }

  isLogged() {
    this.name = localStorage.getItem('name');
    return !!localStorage.getItem('access-token');
  }

  getImage() {
    this.authService.getUser().subscribe(
      data => {
        if (data.data.image.url) {
          this.image_url = 'http://localhost:3000' + data.data.image.url;
        } else {
          this.image_url = 'https://image.flaticon.com/icons/svg/149/149071.svg';
        }
      }, err => {
        console.log('No se encontró imagen del usuario');
      }
    );
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
}
