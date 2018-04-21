import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from 'ngx-auth';
import { environment } from '../../../environments/environment';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { TokenStorage } from './token-storage.service';
import { User } from '../../_models/user.model';
import { Volunteer } from '../../_models/volunteer.model';
import { CompileStylesheetMetadata } from '@angular/compiler';

class AccessData {
  private accessToken: string;
  private client: string;
  private uid: string;
  private expiry: string;
  private tokenType: string;

  public constructor(accessToken, client, uid, expiry, tokenType) {
    this.accessToken = accessToken;
    this.client = client;
    this.uid = uid;
    this.expiry = expiry;
    this.tokenType = tokenType;
  }

  public getAccessToken(): string {
    return this.accessToken;
  }

  public getUid(): string {
    return this.uid;
  }

  public getClient(): string {
    return this.client;
  }

  public getExpiry(): string {
    return this.expiry;
  }

  public getTokenType(): string {
    return this.tokenType;
  }
}

interface UserData {
  allow_password_change: boolean;
  email: string;
  id: number;
  name: string;
  provider: string;
  uid: string;
  username: string;
}

const API_URL = environment.apiUrl;

@Injectable()
export class AuthenticationService implements AuthService {
  private currentUser: AccessData;
  private currentHeaders = new HttpHeaders();

  constructor(private http: HttpClient, private tokenStorage: TokenStorage) {}

  /**
   * Check, if user already authorized.
   * @description Should return Observable with true or false values
   * @returns {Observable<boolean>}
   * @memberOf AuthService
   */
  public isAuthorized(): Observable<boolean> {
    return this.tokenStorage.getAccessToken().map(token => !!token);
  }

  /**
   * Get access token
   * @description Should return access token in Observable from e.g.
   * localStorage
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    return this.tokenStorage.getAccessToken();
  }

  /**
   * Function, that should perform refresh token verifyTokenRequest
   * @description Should be successfully completed so interceptor
   * can execute pending requests or retry original one
   * @returns {Observable<any>}
   */
  public refreshToken(): Observable<AccessData> {
    return this.tokenStorage
      .getRefreshToken()
      .switchMap((refreshToken: string) => {
        return this.http.post(API_URL + '/refresh', {
          refreshToken
        });
      })
      .do(this.saveAccessData.bind(this))
      .catch(err => {
        this.logout();

        return Observable.throw(err);
      });
  }

  /**
   * Function, checks response of failed request to determine,
   * whether token be refreshed or not.
   * @description Essentialy checks status
   * @param {Response} response
   * @returns {boolean}
   */
  public refreshShouldHappen(response: HttpErrorResponse): boolean {
    return response.status === 401;
  }

  /**
   * Verify that outgoing request is refresh-token,
   * so interceptor won't intercept this request
   * @param {string} url
   * @returns {boolean}
   */
  public verifyTokenRequest(url: string): boolean {
    return url.endsWith('/refresh');
  }

  /**
   * EXTRA AUTH METHODS
   */

  public loginUser(email: string, password: string): Observable<any> {
    return this.http
      .post(
        API_URL + '/auth_user/sign_in',
        { email, password },
        { observe: 'response' }
      )
      .do(
        resp => {
          this.currentUser = new AccessData(
            resp.headers.get('access-token'),
            resp.headers.get('client'),
            resp.headers.get('uid'),
            resp.headers.get('expiry'),
            resp.headers.get('token-type')
          );
          this.saveAccessData();
        },
        err => {
          console.error(err);
          this.tokenStorage.clear();
        }
      );
  }

  public signUpUser(user: User): Observable<any> {
    const name = user.firstname + ' ' + user.lastname;
    const email = user.email;
    const password = user.password;
    const password_confirmation = user.password_confirmation;
    const username = user.username;
    return this.http
      .post(
        API_URL + '/auth_user',
        { name, username, email, password, password_confirmation },
        { observe: 'response' }
      )
      .do(
        resp => {
          this.currentUser = new AccessData(
            resp.headers.get('access-token'),
            resp.headers.get('client'),
            resp.headers.get('uid'),
            resp.headers.get('expiry'),
            resp.headers.get('token-type')
          );
          this.saveAccessData();
        },
        err => {
          console.error(err.message);
          return null;
        }
      );
  }

  public signUpVoluntary(voluntary: Volunteer) {
    const birthday = voluntary.birthday;
    const gender = voluntary.gender;
    const city = voluntary.city;
    const cellphone = voluntary.cellphone;
    // const interest = voluntary.theme_interest;
    const headers = this.getCurrentHeaders();
    console.log(headers.get('access-token'));
    return this.http.post(
      API_URL + '/voluntaries',
      {
        gender,
        city,
        cellphone
      },
      {
        headers: headers
      }
    );
  }

  completeSignUp() {
/*     this.validateToken();
 */  }

  loginAdmin(email: string, password: string): any {
    return this.http
      .post(API_URL + '/auth_admin/sign_in', { email, password })
      .do((tokens: AccessData) => this.saveAccessData());
  }

  loginOrg(email: string, password: string): any {
    return this.http
      .post(API_URL + '/auth_org/sign_in', { email, password })
      .do((tokens: AccessData) => this.saveAccessData());
  }
  /**
   * Logout
   */
  public logout() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'access-token': <string>localStorage.getItem('access-token'),
      client: <string>localStorage.getItem('client'),
      uid: <string>localStorage.getItem('uid')
    });

    return this.http
      .delete(API_URL + '/auth_user/sign_out', { headers: headers })
      .do(
        data => {
          this.tokenStorage.clear();
        },
        err => {
          this.tokenStorage.clear();
        }
      );
  }
/*
  public validateToken() {
    const headers = this.getCurrentHeaders();
    return this.http
      .get<UserData>(API_URL + '/auth_user/validate_token', { headers: headers })
      .subscribe(
        data => {
          console.log(data.name);
        },
        err => {
          if (err.status === 401) {
            this.tokenStorage.clear();
          }
        }
      );
  } */

  /**
   * Save access data in the storage
   *
   * @private
   * @param {AccessData} data
   */
  private saveAccessData() {
    this.tokenStorage.setAccessToken(this.currentUser.getAccessToken());
    this.tokenStorage.setClient(this.currentUser.getClient());
    this.tokenStorage.setUid(this.currentUser.getUid());
    this.tokenStorage.setExpiry(this.currentUser.getExpiry());
    this.tokenStorage.setTokenType(this.currentUser.getTokenType());
  }

  public getCurrentHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'access-token': <string>localStorage.getItem('access-token'),
      client: <string>localStorage.getItem('client'),
      uid: <string>localStorage.getItem('uid')
    });
  }
}
