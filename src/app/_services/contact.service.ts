import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../_models';

const API_URL = environment.apiUrl;

@Injectable()
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  public getContactTypes(): Observable<any> {
    return this.http.get(API_URL + '/type_contacts');
  }

  public sendContactQuery(contact: Contact): Observable<any> {
    return this.http.post(API_URL + '/contact_data',
      {
        'type_contact_id': contact.contact_type,
        'name': contact.name,
        'email': contact.email,
        'phone': contact.phone,
        'city': contact.city,
        'body': contact.body
      }

    );
  }

}
