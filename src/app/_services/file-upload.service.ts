import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class FileUploadService {

  constructor(
    private http: HttpClient
  ) { }

  public avatarUserUploader(avatar: File) {
    return this.http.put(API_URL + '/auth_user', avatar);
  }
}
