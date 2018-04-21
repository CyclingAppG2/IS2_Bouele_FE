import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, EventService } from '../_services/index';
import { Router } from '@angular/router';
import { User } from '../_models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public users$: Observable<any>;
  public events: any;

  constructor(
    private router: Router,
    private dataService: EventService,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    // this.authService.validateToken();
    this.dataService.getEvents().subscribe(events => (this.events = events));
  }

  validate() {
/*     this.authService.validateToken();
 */  }
}
