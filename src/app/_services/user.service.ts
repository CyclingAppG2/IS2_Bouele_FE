
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

    public goHome(): string {
        const role = localStorage.getItem('role');
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
