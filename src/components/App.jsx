import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import Contacts from './Contacts/Contacts';
import Form from './Form/Form';
import Filter from './Filter/Filter';
import { addContact, deleteContact, updateFilter } from '../store';

const App = () => {
  const contacts = useSelector(state => state.contacts);
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();

  const handleAddContact = (name, number) => {
    const isNameExists = contacts.some(contact => contact.name === name);

    if (isNameExists) {
      alert(`Contact with name "${name}" already exists.`);
    } else {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };

      dispatch(addContact(newContact));
    }
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const handleFilterChange = event => {
    const { value } = event.target;
    dispatch(updateFilter(value));
  };

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <>
      <h1>Phonebook</h1>

      <Form onAddContact={handleAddContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />

      {contacts.length > 0 ? (
        <Contacts
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      ) : (
        <p>No contacts available.</p>
      )}
    </>
  );
};

export default App;
