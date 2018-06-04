import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication';

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

  public getGenderById(gender_id) {
    const headers = this.authService.getCurrentHeaders();
    return this.http.get(API_URL + '/genders/' + gender_id, {headers: headers});

  }
}
