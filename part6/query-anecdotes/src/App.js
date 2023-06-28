import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, voteAnecdote } from './requests';

const App = () => {
  const queryClient = useQueryClient();

  const voteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (updatedAnecdote) => {
      const updatedId = updatedAnecdote.id;
      queryClient.setQueryData(['anecdotes'], (prev) =>
        prev.map((e) => (e.id === updatedId ? updatedAnecdote : e))
      );
    },
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['anecdotes'],
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
    voteMutation.mutate(anecdote);
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
