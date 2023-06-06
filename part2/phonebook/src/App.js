import { useState } from 'react';
import Person from './Person';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const handleAddNewPerson = (e) => {
    e.preventDefault();

    // catcher for duplicate numbers
    if (persons.filter((person) => person.name === newName).length !== 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    setPersons([...persons, { name: newName, number: newNumber }]);
    setNewName('');
    setNewNumber('');
  };

  const handleChange = (e, setValue) => {
    setValue(e.target.value);
  };

  const peopleToShow = persons.filter(
    (person) => person.name.toLowerCase().indexOf(search.toLowerCase()) === 0
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        filter shown with{' '}
        <input
          onChange={(e) => {
            handleChange(e, setSearch);
          }}
          value={search}
        />
      </form>

      <h2>add a new</h2>
      <form onSubmit={handleAddNewPerson}>
        <div>
          name:{' '}
          <input
            onChange={(e) => handleChange(e, setNewName)}
            value={newName}
            required
          />
        </div>
        <div>
          number:{' '}
          <input
            onChange={(e) => handleChange(e, setNewNumber)}
            value={newNumber}
            required
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {peopleToShow.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
