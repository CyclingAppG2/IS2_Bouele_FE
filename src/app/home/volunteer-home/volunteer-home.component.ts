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
  ) { }

  onScroll() {
    console.log('scrolled!!');
  }

  ngOnInit() {
    this.eventService.getEvents()
      .subscribe(
        events => {
          this.events = events;
          console.log(this.events);
        }
      );
  }

}
