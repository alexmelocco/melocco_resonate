import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Contacts.css';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [isGrid, setIsGrid] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setContacts(response.data);
      })
      .catch(error => {
        console.error('Error fetching the contacts', error);
      });
  }, []);

  const toggleLayout = () => {
    setIsGrid(!isGrid);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contacts">
      <h1>Contacts</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
        />
        <button onClick={toggleLayout}>
          {isGrid ? 'List' : 'Grid'} View
        </button>
      </div>
      <ul className={`contacts-list ${isGrid ? 'grid' : 'list'}`} key={isGrid ? 'grid' : 'list'}>
        {filteredContacts.map(contact => (
          <li key={contact.id} className="contact-item">
            <h2>{contact.name}</h2>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <p>{contact.website}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
