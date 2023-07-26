import React, { useState, useEffect } from 'react';
import Contacts from './Contacts/Contacts';
import { nanoid } from 'nanoid';
import Form from './Form/Form';
import Filter from './Filter/Filter';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(storedContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  
  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const addContact = (name, number) => {
    const isNameExists = contacts.some(contact => contact.name === name);

    if (isNameExists) {
      alert(`Contact with name "${name}" already exists.`);
    } else {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };

      setContacts(prevContacts => [...prevContacts, newContact]);
    }
  };

  const handleFilterChange = event => {
    const { value } = event.target;
    setFilter(value);
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

      <Form onAddContact={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />

      {contacts.length > 0 ? (
        <Contacts contacts={filteredContacts} onDeleteContact={deleteContact} />
      ) : (
        <p>No contacts available.</p>
      )}
    </>
  );
};

export default App;
