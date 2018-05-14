import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable()
export class InterestService {

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) { }

  public getInterests() {
    const headers = this.authService.getCurrentHeaders();
    return this.http.get(API_URL + '/theme_interests', {headers: headers});
  }

}
