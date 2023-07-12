import { useState } from 'react';
import { Routes, Route, useMatch } from 'react-router-dom';
import Menu from './components/Menu';
import AnecdoteList from './components/AnecdoteList';
import CreateNew from './components/CreateNew';
import About from './components/About';
import Footer from './components/Footer';
import Anecdote from './components/Anecdote';

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1,
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2,
    },
  ]);

  const match = useMatch('/anecdotes/:id');
  const anecdote =
    match !== null
      ? anecdotes.find((e) => e.id === Number(match.params.id))
      : null;

  const [notification, setNotification] = useState('');

  const notify = (str) => {
    setNotification(str);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <div
        style={{
          width: 'max-content',
          border: '2px solid magenta',
          padding: '10px',
          maring: '4px',
        }}
      >
        {notification}
      </div>
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/create"
          element={<CreateNew addNew={addNew} notify={notify} />}
        />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;