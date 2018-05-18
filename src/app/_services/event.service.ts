import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, ResponseContentType } from '@angular/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
    private authService: AuthenticationService,
    private sanitizer: DomSanitizer
  ) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(API_URL + '/events', {
      headers: this.headers
    });
  }

  getAvailableEvents() {
    return this.http.get(API_URL + '/events/available', { headers: this.headers });
  }

  newEvent(event): Observable<any> {
    console.log(this.headers);

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
    return this.http.get(API_URL + '/events/' + id, { headers: this.headers });
  }

  public applyToEvent(eventId: number): Observable<any> {
    return this.http.post(API_URL + '/event_voluntaries', { 'event_voluntary': { 'event_id': eventId } }, { headers: this.headers });
  }

  public getMyEvents(): Observable<any> {
    return this.http.get(API_URL + '/events/my_events', { headers: this.headers });
  }

  public leaveEvent(id: number): Observable<any> {
    console.log('holaaaaaaaaaaaaa 2' + id);
    const httpOptions = {
      headers: this.headers, body: { 'event': id }
    };
    return this.http.delete(API_URL + '/voluntary/leave_event', httpOptions);
  }

  public getVoluntariesInEvent(id: number, format: string) {
    return this.http.get(API_URL + '/voluntaries_in_event/' + id + '.' + format,  {headers: this.headers, observe: 'response'});
  }

}
