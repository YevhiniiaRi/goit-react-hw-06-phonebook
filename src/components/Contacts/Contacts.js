import React from 'react';
import PropTypes from 'prop-types';
import styles from './Contacts.module.css';

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

const Contacts = ({ contacts, onDeleteContact }) => (
  <ul>
    {contacts.map(contact => (
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

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default Contacts;
