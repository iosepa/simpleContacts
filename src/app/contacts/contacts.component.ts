import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { NbSidebarService } from '@nebular/theme';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  contacts: Contact[];
  contact: Contact;
  currentContact: Contact;
  first_name: string;
  last_name: string;
  phone: string;
  cForm: FormGroup;
  uForm: FormGroup;

  hideEditForm = true;
  toggled = false;
  showForm = false;
  revealed = false;

  constructor(private contactService: ContactService, private sidebarService: NbSidebarService) { }

  toggle() {
    this.sidebarService.toggle(false);
    this.toggled = !this.toggled;
    return false;
  }

  ngOnInit() {
    this.makeNewContactForm();
    this.getContacts();
  }

  createContact() {
    if (this.cForm.valid) {
      this.contactService.addContact(this.cForm.value)
        .subscribe(result => {
          if (result.msg === "Contact added successfully") {
            this.cForm.reset();
            this.makeNewContactForm();
            this.getContacts(); //need to get the new set of contacts with an id
            this.revealed = false;
            this.showForm = false;
          }
          else {
            alert('Problem connecting to the database. Please try later.')
          }
        });
    }
    else
    {
      //alert('fill something in or something')
    }
  }

  getContacts() {
    this.contactService.getContacts()
      .subscribe(contacts => {
        this.contacts = contacts;
        this.currentContact = this.contacts[this.contacts.length - 1];
      });
  }

  updateContact(id) {
    this.contacts.map(contact => {
      if (contact._id === id) { //don't yet know how to grab pre-filled values from model driven forms, so populate here  
        Object.keys(contact).filter(key => key.indexOf('_') != 0).forEach(val => {
          this.uForm.value[val] ?
            contact[val] = this.uForm.value[val] :
            contact[val] = this.currentContact[val];
        })
      }
    })
    this.contactService.updateContact(id, this.uForm.value)
      .subscribe(res => {
        if (res.msg === "Contact updated successfully") {
          this.revealed = false;
        }
        else {
          alert(`Problem updating contact.`)
        }
      })
  }

  deleteContact(id) {
    let currentIndex = this.contacts.findIndex(contact => contact._id === id);//find current instance to have the highlight come up to the next contact
    this.contactService.deleteContact(id)
      .subscribe(res => {
        if (res.msg === 'Contact deleted successfully') {
          this.contacts = this.contacts.filter(function (contact) { //remove local instance of contact
            return (contact._id !== id)
          })
        }
        else {
          alert(`Problem deleting contact, guess it's meant to be.`)
        }
      })
    this.currentContact = this.contacts[currentIndex === 0 ? 1 : currentIndex - 1]; //set focus on next contact
    this.revealed = false;
  }

  showContactDets(id) {
    this.currentContact = this.contacts.find(contact => contact._id == id);
    this.showForm = false;
    this.revealed = false;
    this.uForm.setValue({
      first_name: this.currentContact.first_name,
      last_name: this.currentContact.last_name,
      phone: this.currentContact.phone
    })
  }

  makeNewContactForm() {
    this.cForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      phone: new FormControl(),
    })
    this.uForm = new FormGroup({
      first_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      last_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      phone: new FormControl(),
    })
  }

  showNewForm() {
    this.showForm = true;
    this.cForm.reset();
  }

  toggleView() { this.revealed = !this.revealed; }


}
