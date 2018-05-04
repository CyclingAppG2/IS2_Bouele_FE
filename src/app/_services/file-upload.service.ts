import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '.';
import { Observable } from 'rxjs/Observable';
import { HttpRequest } from 'selenium-webdriver/http';
import { andObservables } from '@angular/router/src/utils/collection';

const API_URL = environment.apiUrl;

@Injectable()
export class FileUploadService {
  private headers = this.authService.getCurrentHeaders();

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  public avatarUserUploader(avatar: File): Observable<any> {
    this.headers.append('content-type', 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW');
    console.log(this.headers);
    const formData = new FormData();
    formData.append('image', avatar, avatar.name);
    return this.http.patch(API_URL + '/auth_user', formData, { headers: this.headers });
  }
}
