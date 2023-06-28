import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery } from '@tanstack/react-query';
import { getAnecdotes } from './requests';

const App = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: 'anecdotes',
    queryFn: getAnecdotes,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (error !== null) {
    return (
      <div>
        <h1>Error</h1>
        {error}
      </div>
    );
  }

  const handleVote = (anecdote) => {
    console.log('vote');
  };

  const anecdotes = data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;