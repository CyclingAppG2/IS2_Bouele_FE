import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Event } from '../_models/event.model';
import { AuthenticationService } from './authentication';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class EventService {

  private headers = this.authService.getCurrentHeaders();

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(API_URL + '/events', {
      headers: this.headers
    });
  }

  getAvailableEvents() {
    return this.http.get(API_URL + '/events/available', {headers: this.headers});
  }

  newEvent(event): Observable<any> {

    return this.http.post(
      API_URL + '/events',
      event,
      { headers: this.headers }
    ).do(
      resp => {
        console.log(resp);
      }
    );
  }

  getEventById(id: number): Observable<any> {
    return this.http.get(API_URL + '/events/' + id, {headers: this.headers});
  }
}
