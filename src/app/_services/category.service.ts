import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable()
export class CategoryService {

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  public getCategories(): Observable<any> {
    const headers = this.authService.getCurrentHeaders();
    return this.http.get(API_URL + '/organization_categories', {headers: headers});
  }
}
