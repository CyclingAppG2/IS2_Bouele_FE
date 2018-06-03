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

  public getForumsTotalPages() {
    return this.http.get(API_URL + '/forums/size_paginate', {headers: this.headers});
  }

  public getForumsByCreation(page) {
    return this.http.get(API_URL + '/forums?by=1&page=' + page, {headers: this.headers});
  }

  public getForumsByPopularity(page) {
    return this.http.get(API_URL + '/forums?by=2&page=' + page, {headers: this.headers});
  }

  public getForumById(id) {
    return this.http.get(API_URL + '/forum_threads/' + id, {headers: this.headers} );
  }

  public responseForum(response) {
    return this.http.post(API_URL + '/forum_posts', response, {headers: this.headers});
  }

  public rateForum(id, rate) {
    return this.http.patch(API_URL + '/forums/points/' + id, rate, {headers: this.headers});
  }

  public responsesForum(id) {
    return this.http.get(API_URL + '/forum_post/forum/' + id, {headers: this.headers});
  }

  public likeResponse(like) {
    return this.http.post(API_URL + '/boards', like, {headers: this.headers});
  }

}
