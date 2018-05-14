import { Component, OnInit } from '@angular/core';
import { UserService, EventService } from '../../_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-volunteer-home',
  templateUrl: './volunteer-home.component.html',
  styleUrls: ['./volunteer-home.component.css']
})
export class VolunteerHomeComponent implements OnInit {

  public events: any;

  constructor(
    private eventService: EventService,
    private router: Router
  ) {
    this.eventService.getAvailableEvents()
      .subscribe(
        events => {
          this.events = events;
        }
      );
  }

  onScroll() {
    console.log('scrolled!!');
  }

  ngOnInit() {

  }

}
