
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../_models';
import { AuthenticationService } from './authentication';
import { Router } from '@angular/router';

const API_URL = environment.apiUrl;

@Injectable()
export class UserService {

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) { }


    public initUser(): User {
        const voluntary = new User();
        this.authService.getUser()
            .subscribe(
                user => {
                    const name = user.data.name.split(' ');
                    voluntary.lastname = name[name.length - 2] + ' ' + name[name.length - 1];
                    voluntary.firstname = name[0] + ' ' + name[1];
                    voluntary.avatar = API_URL + user.data.image.url;
                    voluntary.email = user.data.email;
                    voluntary.username = user.data.username;
                }
            );
        return voluntary;
    }

    public goHome(): string {
        const role = localStorage.getItem('role');
        console.log('HOldskfjaslk', role);
        switch (role) {
            case 'Voluntary':
                return 'voluntary-home';
            case 'Administrator':
                return 'administrator-home';
            case 'Organization':
                return 'organization-home';
            case 'undefined':
                return 'complete-form';
        }
    }
}
