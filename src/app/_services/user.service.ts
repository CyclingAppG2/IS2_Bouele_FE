
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class UserService {

    constructor(private http: HttpClient) {}

    getUsers() {
        return this.http.get('http://localhost:3000/auth/');
    }

    postAvatar(fileToUpload: File) {
        const endpoint = API_URL + 'auth_user';
        const formData: FormData = new FormData();
        formData.append('Image', fileToUpload, fileToUpload.name);
        return this.http
          .post(endpoint, formData);
    }
}
