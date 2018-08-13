import React from 'react';
import './style/app.css';
import ContactList from './contacts.json';
import rerender from './../index';

const viewDetails = (contact) => (
    <div className="content">
        <div className="info">
            <div className="col">
                <span className="avatar">&#9787;</span>
            </div>
            <div className="col">
                <span className="name">{contact.firstName}</span>
                <span className="name">{contact.lastName}</span>
        </div>
        </div>
            <div className="info">
                <span className="info-line">&phone; {contact.phone}</span>
                <span className="info-line">&#9993; {contact.email}</span>
        </div>
    </div>
);

let indexContact = 0;


const selectContact = index => {
    indexContact = index;
    rerender(App(), document.getElementById('root'));
}

const showContact = (contact, targetIndex) => (
    <div className="contact" data-id={targetIndex} key={contact.email} onClick={e => selectContact(targetIndex, e)}>
        <span className="avatar small">&#9787;</span>
        <span className="title">{contact.firstName} {contact.lastName}</span>
    </div>
)


const renderList = () => {
  let listFromContacts = [];
  for (let contact of ContactList) {
    listFromContacts.push(showContact(contact, listFromContacts.length));
  }

  return listFromContacts;
};


const App = () => (
      <div className="container">
        <header>&#9993; Contact Book</header>
        <div id="book">
            <div id="list">
                <h1>Contacts</h1>
                <div className="content">
                    {renderList()}
                </div>
            </div>
            <div id="details">
                <h1>Details</h1>
                {viewDetails(ContactList[indexContact])}
            </div>
        </div>
        <footer>Contact Book SPA &copy; 2018</footer>
      </div>
);

export default App;
