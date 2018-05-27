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

  public getStatisticsEventCreations(id) {
    return this.http.get(API_URL + '/organizations/statistics/' + id + '.json', {headers: this.headers});
  }

  downloadPDF(id): any {
    const file = '';
    this.http.get(API_URL + '/organizations/statistics/' + id + '.pdf',
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
}
