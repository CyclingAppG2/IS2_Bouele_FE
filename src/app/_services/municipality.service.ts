import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs/Observer';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs/Observable';

const API_URL = environment.apiUrl;

@Injectable()
export class MunicipalityService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * getMunicipality
   */
  public getMunicipalities(): Observable<any> {
    return this.http.get(API_URL + '/minicipalities');
  }

  public getMunicipalityById(municipality_id) {
    return this.http.get(API_URL + '/minicipalities/' + municipality_id);
  }
}
