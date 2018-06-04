import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService, EventService } from '../../_services';
import { Router } from '@angular/router';
import { User } from '../../_models';
import swal from 'sweetalert2/dist/sweetalert2.js';
import { environment } from '../../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-voluntary-profile',
  templateUrl: './voluntary-profile.component.html',
  styleUrls: ['./voluntary-profile.component.css']
})

export class VoluntaryProfileComponent implements OnInit {
  API_URL = environment.apiUrl;
  user;
  my_events: any;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private _sanitizer: DomSanitizer
  ) {
    this.authService.getTypeOfUser()
      .subscribe(
        resp => {
          this.authService.getUserInfo()
            .subscribe(
              info => {
                // tslint:disable-next-line:prefer-const
                let user_data_id = JSON.parse(JSON.stringify(resp)).data.user_data_id;
                // tslint:disable-next-line:prefer-const
                let type_of_user = JSON.parse(JSON.stringify(resp)).data.user_data_type;
                this.authService.getUserDataInfo(type_of_user, user_data_id)
                  .subscribe(
                    dataInfo => {
                      this.user = {
                        type: JSON.parse(JSON.stringify(resp)).data.user_data_type,
                        user: {
                          email: JSON.parse(JSON.stringify(info)).data.email,
                          name: JSON.parse(JSON.stringify(info)).data.name,
                          username: JSON.parse(JSON.stringify(info)).data.username,
                          image: JSON.parse(JSON.stringify(info)).data.image,
                          points_day: JSON.parse(JSON.stringify(info)).data.points_day
                        },
                        data: {
                          birthday: JSON.parse(JSON.stringify(dataInfo)).birthday,
                          cellphone: JSON.parse(JSON.stringify(dataInfo)).cellphone,
                          gender: JSON.parse(JSON.stringify(dataInfo)).gender,
                          theme_interests: JSON.parse(JSON.stringify(dataInfo)).theme_interests,
                          voluntary_score: JSON.parse(JSON.stringify(dataInfo)).voluntary_score
                        }
                      };
                    }
                  );
              }
            );
        }
      );

  }

  ngOnInit() {
  }

  public getAvatar(url) {
    return url ? this.API_URL + url : '/assets/images/user-default.svg';
  }
}
