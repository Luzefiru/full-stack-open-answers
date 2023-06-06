import { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const handleAddNewPerson = (e) => {
    e.preventDefault();

    // catcher for duplicate numbers
    if (persons.filter((person) => person.name === newName).length !== 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    // posts to the db.json server
    personsService
      .createPerson({ name: newName, number: newNumber })
      .then((newPerson) => {
        setPersons([...persons, newPerson]);
        setNewName('');
        setNewNumber('');
      });
  };

  const handleDeletePerson = (personId) => {
    console.log(personId);
    personsService.deletePerson(personId).then(() => {
      setPersons(persons.filter((p) => p.id !== personId));
    });
  };

  const personsToShow = persons.filter(
    (person) => person.name.toLowerCase().indexOf(search.toLowerCase()) === 0
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch} />

      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleAddNewPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      <Persons
        personsToShow={personsToShow}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
