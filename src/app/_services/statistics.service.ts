import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication';

const API_URL = environment.apiUrl;

@Injectable()
export class StatisticsService {

  private headers = this.authService.getCurrentHeaders();

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  public getStatisticsEventCreations(id: number) {
    return this.http.get(API_URL + '/organizations/statistics/' + id, {headers: this.headers});
  }
}
