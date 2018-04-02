import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, UserService } from '../_services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

  public users$: Observable<any>;

  constructor(
    private router: Router,
    private dataService: UserService,
    private authService: AuthenticationService
  ) { }

  public loadData() {
    this.users$ = this.dataService.getUsers();
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
}

}
