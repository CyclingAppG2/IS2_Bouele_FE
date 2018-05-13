import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '.';

const API_URL = environment.apiUrl;

@Injectable()
export class GenderService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  getGenders() {
    const headers = this.authService.getCurrentHeaders();
    return this.http.get(API_URL + '/genders', {headers: headers});
  }
}
