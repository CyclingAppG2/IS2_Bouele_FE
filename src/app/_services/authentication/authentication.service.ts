import { Injectable, InjectionToken } from '@angular/core';
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
import { Organization } from '../../_models';
import { Router } from '@angular/router';

class AccessData {
  private accessToken: string;
  private client: string;
  private uid: string;
  private expiry: string;
  private tokenType: string;
  private name: string;
  private email: string;
  private id: string;
  private username: string;
  private role: string;
  private image: string;
  private data_id: string;


  constructor(accessToken?, client?, uid?, expiry?, tokenType?, id?, name?, username?, email?, role?, image?, data_id?) {
    this.accessToken = accessToken;
    this.client = client;
    this.uid = uid;
    this.expiry = expiry;
    this.tokenType = tokenType;
    this.name = name;
    this.id = id;
    this.username = username;
    this.role = role;
    this.email = email;
    this.data_id = data_id;
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

  public getName(): string {
    return this.name;
  }

  public getId(): string {
    return this.id;
  }

  public getUsername(): string {
    return this.username;
  }

  public getEmail(): string {
    return this.email;
  }

  public getRole(): string {
    return this.role;
  }

  public setRole(role: string) {
    this.role = role;
  }

  public setImage(image: string) {
    this.image = API_URL + image;
  }

  public getImage(): string {
    console.log(this.image);
    return this.image;
  }

  public getDataId(): string {
    return this.data_id;
  }
}

const API_URL = environment.apiUrl;

@Injectable()
export class AuthenticationService implements AuthService {

  private currentUser = new AccessData();
  id;

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorage,
    private router: Router
  ) {
  }

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
        return this.http.post(API_URL + '/auth_user/validate_token', {
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
    return url.endsWith(API_URL + '/auth_user/validate_token');
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
          this.http.get(API_URL + '/userType', { headers: resp.headers })
            .subscribe(
              data => {
                this.currentUser = new AccessData(
                  resp.headers.get('access-token'),
                  resp.headers.get('client'),
                  resp.headers.get('uid'),
                  resp.headers.get('expiry'),
                  resp.headers.get('token-type'),
                  JSON.parse(JSON.stringify(resp)).body.data.id,
                  JSON.parse(JSON.stringify(resp)).body.data.name,
                  JSON.parse(JSON.stringify(resp)).body.data.username,
                  JSON.parse(JSON.stringify(resp)).body.data.email,
                  JSON.parse(JSON.stringify(data)).data.user_data_type,
                  JSON.parse(JSON.stringify(resp)).body.data.image.url,
                  JSON.parse(JSON.stringify(data)).data.user_data_id
                );
                this.saveAccessData();
                this.router.navigateByUrl(this.goHome(JSON.parse(JSON.stringify(data)).data.user_data_type));
              }, err => {
                console.log(err);
                console.log(resp);
                this.currentUser = new AccessData(
                  resp.headers.get('access-token'),
                  resp.headers.get('client'),
                  resp.headers.get('uid'),
                  resp.headers.get('expiry'),
                  resp.headers.get('token-type'),
                  JSON.parse(JSON.stringify(resp)).body.data.id,
                  JSON.parse(JSON.stringify(resp)).body.data.name,
                  JSON.parse(JSON.stringify(resp)).body.data.username,
                  JSON.parse(JSON.stringify(resp)).body.data.email,
                  undefined,
                  JSON.parse(JSON.stringify(resp)).body.data.image.url,
                  undefined
                );
                this.saveAccessData();
                this.router.navigateByUrl('complete-form');

              }
            );
        },
        err => {

          console.error(err);
          this.tokenStorage.clear();
        }
      );
  }

  public loginAdmin(email: string, password: string): any {
    return this.http
      .post(
        API_URL + '/auth_admin/sign_in',
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
            resp.headers.get('token-type'),
            JSON.parse(JSON.stringify(resp)).body.data.id,
            JSON.parse(JSON.stringify(resp)).body.data.name,
            JSON.parse(JSON.stringify(resp)).body.data.username,
            JSON.parse(JSON.stringify(resp)).body.data.email,
            'Administrator',
            JSON.parse(JSON.stringify(resp)).body.data.image.url,
          );
          this.tokenStorage.setRole('Administrator');
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
            resp.headers.get('token-type'),
            JSON.parse(JSON.stringify(resp)).body.data.id,
            JSON.parse(JSON.stringify(resp)).body.data.name,
            JSON.parse(JSON.stringify(resp)).body.data.username,
            JSON.parse(JSON.stringify(resp)).body.data.email
          );
          this.saveAccessData();
        },
        err => {
          console.error(err.message);
          return null;
        }
      );
  }


  public signUpVoluntary(voluntary) {

    const headers = this.getCurrentHeaders();
    return this.http.post(
      API_URL + '/voluntaries',
      voluntary,
      {
        headers: headers
      }
    )
      .do(
        resp => {
          this.currentUser.setRole('Voluntary');
          this.tokenStorage.setRole('Voluntary');
          localStorage.setItem('user-data-id', JSON.parse(JSON.stringify(resp)).id);
        },
        err => {
          console.error(err.message);
        }
      );
  }

  public signUpOrganization(organization: Organization) {
    const nit = organization.nit;
    const category = organization.category;
    const city = organization.city;
    const address = organization.address;
    const organizationName = organization.name;
    const headers = this.getCurrentHeaders();
    return this.http.post(
      API_URL + '/organizations',
      {
        'organization': {
          'NIT': nit,
          'minicipality_id': city,
          'organization_category_id': category,
          'mainaddress': address,
          'firm': organizationName
        }
      },
      {
        headers: headers
      }
    )
      .do(
        resp => {
          this.currentUser.setRole('Organization');
          this.tokenStorage.setRole('Organization');
          localStorage.setItem('user-data-id', JSON.parse(JSON.stringify(resp)).id);
        },
        err => {
          console.error(err.message);
        }
      );
  }

  public completeSignUp(userId, voluntaryId, userType) {
    const headers = this.getCurrentHeaders();
    return this.http.post(API_URL + '/user_polymorphisms', {
      'user_id': userId,
      'user_data_id': voluntaryId,
      'user_data_type': userType
    },
      {
        headers: headers
      });
  }

  /**
   * Logout
   */
  public logout() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'access-token': <string>localStorage.getItem('access-token'),
      'client': <string>localStorage.getItem('client'),
      'uid': <string>localStorage.getItem('uid')
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

  public validateToken() {
    const headers = this.getCurrentHeaders();
    return this.http
      .get(API_URL + '/auth_user/validate_token', { headers: headers });
  }

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
    this.tokenStorage.setUsername(this.currentUser.getUsername());
    this.tokenStorage.setEmail(this.currentUser.getEmail());
    this.tokenStorage.setId(this.currentUser.getId());
    this.tokenStorage.setName(this.currentUser.getName());
    this.tokenStorage.setRole(this.currentUser.getRole());
    this.tokenStorage.setImage(this.currentUser.getImage());
    this.tokenStorage.setDataId(this.currentUser.getDataId());
  }

  public getCurrentHeaders(): HttpHeaders {
    return new HttpHeaders({
      'access-token': <string>localStorage.getItem('access-token'),
      'client': <string>localStorage.getItem('client'),
      'uid': <string>localStorage.getItem('uid'),
    });
  }

  public getRole(): string {
    const headers = this.getCurrentHeaders();
    this.http.get(API_URL + '/userType', { headers: headers })
      .subscribe(
        data => {
          return JSON.parse(JSON.stringify(data)).data.user_data_type;
        }
      );
    return null;
  }

  public getDataId(): Observable<any> {
    const headers = this.getCurrentHeaders();
    return this.http.get(API_URL + '/userType', { headers: headers });

  }

  public getTypeOfUser() {
    // tslint:disable-next-line:prefer-const
    let headers = this.getCurrentHeaders();
    return this.http.get(API_URL + '/userType', { headers: headers });
  }

  public getUserInfo() {
    // tslint:disable-next-line:prefer-const
    let headers = this.getCurrentHeaders();
    return this.http.get(API_URL + '/auth_user/validate_token', { headers: headers });
  }

  public getUserDataInfo(type_of_user, user_data_id) {
    // tslint:disable-next-line:prefer-const
    let headers = this.getCurrentHeaders();
    switch (type_of_user) {
      case 'Organization':
        return this.http.get(API_URL + '/organizations/' + user_data_id, { headers: headers });
      case 'Voluntary':
        return this.http.get(API_URL + '/voluntaries/' + user_data_id, { headers: headers });
    }
  }
  public goHome(role: String): string {
    switch (role) {
      case 'Voluntary':
        return 'voluntary-home';
      case 'Administrator':
        return 'administrator-home';
      case 'Organization':
        return 'organization-home';
      case null || 'undefinied':
        return 'complete-form';
    }
  }

}

