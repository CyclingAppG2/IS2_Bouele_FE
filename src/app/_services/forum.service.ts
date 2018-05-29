import { Injectable } from '@angular/core';
import { AuthenticationService } from '.';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable()
export class ForumService {

  private headers = this.authService.getCurrentHeaders();

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  public createForum(json) {
    return this.http.post(API_URL + '/forum_threads', json, {headers: this.headers} );
  }


}
