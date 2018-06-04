import { Component, OnInit } from '@angular/core';
import { User } from '../../_models';
import { UserService, EventService, AuthenticationService } from '../../_services';
import { Router } from '@angular/router';
import swal from 'sweetalert2/dist/sweetalert2.all';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.css']
})
export class OrganizationProfileComponent implements OnInit {

  public user;
  private API_URL = environment.apiUrl;

  constructor(
    private authService: AuthenticationService,
    private router: Router
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
                          NIT: JSON.parse(JSON.stringify(dataInfo)).NIT,
                          branches: JSON.parse(JSON.stringify(dataInfo)).branches,
                          category: JSON.parse(JSON.stringify(dataInfo)).category,
                          firm: JSON.parse(JSON.stringify(dataInfo)).firm,
                          mainaddress: JSON.parse(JSON.stringify(dataInfo)).mainaddress,
                          minicipality: JSON.parse(JSON.stringify(dataInfo)).minicipality,
                          organization_category: JSON.parse(JSON.stringify(dataInfo)).organization_category,
                          organization_score: JSON.parse(JSON.stringify(dataInfo)).organization_score
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
