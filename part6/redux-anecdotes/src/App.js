import { useSelector } from 'react-redux';
import Anecdote from './components/Anecdote';
import NewAnecdoteForm from './components/NewAnecdoteForm';

const App = () => {
  const anecdotes = useSelector((state) => state);

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          content={anecdote.content}
          id={anecdote.id}
          votes={anecdote.votes}
        />
      ))}
      <NewAnecdoteForm />
    </div>
  );
};

export default App;
