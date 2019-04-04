import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from'@angular/common/http';
import {Contact } from './contact';
//import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ContactService 
{

  constructor(private http: HttpClient) { }

  getContacts()
  {
    return this.http.get<any>('http://localhost:3000/api/contacts')
  }

  addContact(newContact)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/api/contact', newContact, {headers: headers})
    
  }

  deleteContact(id)
  {
    return this.http.delete<any>('http://localhost:3000/api/contact/'+id)
    
  }

  updateContact(id, contact)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.put<any>('http://localhost:3000/api/contact/'+id, contact, {headers: headers})
    
  }
}
