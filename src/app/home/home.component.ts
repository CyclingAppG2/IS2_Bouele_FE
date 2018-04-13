import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, EventService } from '../_services/index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public users$: Observable<any>;
  public events = [];

  constructor(
    private router: Router,
    private dataService: EventService,
    private authService: AuthenticationService
  ) {}

  public loadData() {
    this.dataService.getEvents().subscribe(events => {
      this.events = events;
    });
  }

  public logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
