import React from 'react';
import PropTypes from 'prop-types';
import styles from './Contacts.module.css';
import { useSelector } from 'react-redux';

const ContactItem = ({ id, name, number, onDeleteContact }) => (
  <li key={id} className={styles.contactRender}>
    <p className={styles.Contacts__text}>
      {name}: {number}
    </p>
    <button onClick={() => onDeleteContact(id)} className={styles.buttonDel}>
      Delete
    </button>
  </li>
);

const Contacts = ({ onDeleteContact }) => {
  const filteredContacts = useSelector(state => {
    const { contacts, filter } = state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <ul>
      {filteredContacts.map(contact => (
        <ContactItem
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
};

Contacts.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
};

export default Contacts;
