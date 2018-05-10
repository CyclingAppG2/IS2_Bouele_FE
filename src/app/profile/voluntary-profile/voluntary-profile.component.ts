import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from '../../_services';
import { Router } from '@angular/router';
import { User } from '../../_models';

@Component({
  selector: 'app-voluntary-profile',
  templateUrl: './voluntary-profile.component.html',
  styleUrls: ['./voluntary-profile.component.css']
})
export class VoluntaryProfileComponent implements OnInit {

  user: User;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.user = this.userService.initUser();
  }


}
