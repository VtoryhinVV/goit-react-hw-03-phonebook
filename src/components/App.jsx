import { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { Contacts } from './Contacts/Contacts';
import { Filter } from './Filter/Filter';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts !== null) {
      const parsedContacts = JSON.parse(savedContacts);
      this.setState({ contacts: parsedContacts });
      return;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };
    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  trackInputFilter = event => {
    this.setState({ filter: event.target.value });
  };

  filterListName = () => {
    const normalizeName = this.state.filter.toLocaleLowerCase();
    return this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(normalizeName)
    );
  };

  handlDelete = event => {
    const { id } = event.target;
    this.setState(({ contacts }) => ({
      contacts: contacts.filter((el, i) => i !== Number(id)),
    }));
  };

  render() {
    return (
      <div
        style={{
          margin: '20px 40px',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter filterName={this.trackInputFilter} />
        <Contacts
          contactsInfo={this.filterListName}
          onDelete={this.handlDelete}
        />
      </div>
    );
  }
}
