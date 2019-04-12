import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from'@angular/common/http';
import {Contact } from './contact';
//import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ContactService 
{
  serverURL = 'https://1e773369.ngrok.io';
  constructor(private http: HttpClient) { }

  getContacts()
  {
    return this.http.get<any>(this.serverURL+'api/contacts')
  }

  addContact(newContact)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>(this.serverURL+'api/contact', newContact, {headers: headers})
    
  }

  deleteContact(id)
  {
    return this.http.delete<any>(this.serverURL+'api/contact/'+id)
    
  }

  updateContact(id, contact)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put<any>(this.serverURL+'api/contact/'+id, contact, {headers: headers})
    
  }
}
