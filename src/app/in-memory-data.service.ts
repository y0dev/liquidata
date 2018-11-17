import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const contacts = [
      {
        id: 1,
        email: "some.email@some.domain.tld",
        subject: "Some subject line",
        body: "A request body. Thanks! -- Aaron"
      },
      {
        id: 2,
        email: "another.email@some.domain.tld",
        subject: "Another subject line",
        body: "A request body. Thanks! -- Bill"
      }
    ];
    return {contacts};
  }

  // Overrides the genId method to ensure that a contact always has an id.
  // If the contacts array is empty,
  // the method below returns the initial number (11).
  // if the contacts array is not empty, the method below returns the highest
  // contact id + 1.
  genId(contacts: Contact[]): number {
    return contacts.length > 0 ? Math.max(...contacts.map(contact => contact.id)) + 1 : 1;
  }
}
