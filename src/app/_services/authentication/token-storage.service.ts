import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenStorage {

  /**
   * Get access token
   * @returns {Observable<string>}
   */
  public getAccessToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('access-token');
    return Observable.of(token);
  }

  /**
   * Get refresh token
   * @returns {Observable<string>}
   */
  public getRefreshToken(): Observable<string> {
    const token: string = <string>localStorage.getItem('refreshToken');
    return Observable.of(token);
  }

  /**
   * Set access token
   * @returns {TokenStorage}
   */
  public setAccessToken(token: string): TokenStorage {
    localStorage.setItem('access-token', token);
    return this;
  }


  public setClient(client: string): TokenStorage {
    localStorage.setItem('client', client);
    return this;
  }


  public setUid(uid: string): TokenStorage {
    localStorage.setItem('uid', uid);
    return this;
  }

  public setExpiry(expiry: string): TokenStorage {
    localStorage.setItem('expiry', expiry);
    return this;
  }

  public setTokenType(tokenType: string): TokenStorage {
    localStorage.setItem('token-type', tokenType);
    return this;
  }

   /**
   * Set refresh token
   * @returns {TokenStorage}
   */
  public setRefreshToken(token: string): TokenStorage {
    localStorage.setItem('access-token', token);

    return this;
  }

  public setName(name: string): TokenStorage {
    localStorage.setItem('name', name);
    return this;

  }

  public setId(id: string): TokenStorage {
    localStorage.setItem('user-id', id);
    return this;

  }

  public setUsername(username: string): TokenStorage {
    localStorage.setItem('username', username);
    return this;

  }

  public setEmail(email: any): TokenStorage {
    localStorage.setItem('email', email);
    return this;

  }

  public setRole(role: any): TokenStorage {
    localStorage.setItem('role', role);
    return this;

  }

  public setImage(image: any): TokenStorage {
    localStorage.setItem('avatar', image);
    return this;
  }

  public setDataId(data_id: any): TokenStorage {
    localStorage.setItem('user-data-id', data_id);
    return this;
  }

   /**
   * Remove tokens
   */
  public clear() {
    localStorage.clear();
  }
}
