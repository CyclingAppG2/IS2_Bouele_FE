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
import { saveAs } from 'file-saver/FileSaver';


const API_URL = environment.apiUrl;

@Injectable()
export class EventService {

  private headers = this.authService.getCurrentHeaders();
  public rowsOnPage = 5;
  public sortBy = 'email';
  public sortOrder = 'asc';

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
    const httpOptions = {
      headers: this.headers, body: { 'event': id }
    };
    return this.http.delete(API_URL + '/voluntary/leave_event', httpOptions);
  }

  public getVoluntariesInEvent(id: number, format: string) {
    return this.http.get(API_URL + '/voluntaries_in_event/' + id + '.' + format, { headers: this.headers, observe: 'response' });
  }

  downloadPDF(id: number): any {
    console.log('hola');
    const file = '';
    this.http.get(API_URL + '/voluntaries_in_event/' + id + '.pdf',
      { headers: this.headers, responseType: 'blob' })
      .subscribe(
        (response) => {
          console.log(response);
          const mediaType = 'application/pdf';
          const blob = new Blob([response], { type: mediaType });
          const filename = 'tu_evento_' + id;
          const url = window.URL.createObjectURL(blob, { oneTimeOnly: true });
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.target = '_blank';
          anchor.click();
          // saveAs(blob, filename);
          console.log(url);
        }, err => {
          console.log(err);
        }
      );

    return file;

  }


  private saveToFileSystem(response) {
    const contentDispositionHeader: string = response.headers.get('Content-Disposition');
    const parts: string[] = contentDispositionHeader.split(';');
    const filename = parts[1].split('=')[1];
    const blob = new Blob([response._body], { type: 'text/plain' });
    saveAs(blob, filename);
  }

  public deleteEvent(id) {
    const httpOptions = {
      headers: this.headers, body: { 'event': id }
    };
    return this.http.delete(API_URL + '/events/' + id, httpOptions);
  }

  public finishEvent(id) {
    return this.http.delete(API_URL + '/events/' + id, {headers: this.headers});
  }

  public orgRateUser(id, score, commentary, voluntary_id) {
    return this.http.put(API_URL + '/event/scores/' + id, {
      'score':
        {
          'scorevoluntary': <string>score,
          'commentsvoluntary': <string>commentary,
          'voluntary_id': <string>voluntary_id
        }
    }, {headers: this.headers});
  }

  public filter(request) {
    return this.http.put(API_URL + '/events/filters', request, {headers: this.headers});
  }

  public getPaginationMaxPage() {
    return this.http.get(API_URL + '/events/my_events?count=1', {headers: this.headers})
  }

  public getPage(page) {
    return this.http.get(API_URL + '/events/my_events?page=' + page, {headers: this.headers})
  }

  public getEventsCategory() {
    return this.http.get(API_URL + '/events', {headers: this.headers});
  }


}
