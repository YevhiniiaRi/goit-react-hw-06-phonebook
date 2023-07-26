import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Form.module.css';

const Form = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.currentTarget;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleAddContact = event => {
    event.preventDefault();
    if (name.trim() === '') {
      return;
    }
    onAddContact(name, number);
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleAddContact} className={styles.formBlock}>
      <label className={styles.labelBlock}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter name"
          pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          className={styles.input}
        />
      </label>
      <label className={styles.labelBlock}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          placeholder="Enter phone number"
          // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses, and plus sign"
          required
          className={styles.input}
        />
      </label>
      <button type="submit" className={styles.buttonAdd}>
        Add Contact
      </button>
    </form>
  );
};

Form.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default Form;
