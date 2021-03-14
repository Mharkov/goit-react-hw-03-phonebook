import { useState, useEffect } from 'react';
import React from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

const App = () => {
  const [newContacts, setNewContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  const hamdleSubmit = (newContact) => {
    if (newContacts.find(({ name }) => name === newContact.name))
      return alert(`${newContact.name} is already in contacts`);
    setNewContacts((prevState) => [newContact, ...prevState]);
  };

  const onDelete = (id) =>
    setNewContacts((prevState) =>
      prevState.filter((newContact) => newContact.id !== id)
    );

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  const filteredContacts = newContacts.filter((newContact) =>
    newContact.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    const todos = localStorage.getItem('newContacts');
    const parsedTodos = JSON.parse(todos);

    if (parsedTodos) {
      setNewContacts(parsedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('newContacts', JSON.stringify(newContacts));
  }, [newContacts]);

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={hamdleSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChangeFilter={handleChangeFilter} />
      <ContactList
        newContacts={newContacts}
        onRemoveContact={onDelete}
        filteredContacts={filteredContacts}
      />
    </>
  );
};

export default App;
