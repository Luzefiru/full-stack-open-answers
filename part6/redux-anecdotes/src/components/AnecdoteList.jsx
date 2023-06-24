import { useSelector } from 'react-redux';
import Anecdote from './Anecdote';

export default function AnecdoteList() {
  const anecdotes = useSelector((state) => {
    return [...state].sort((a, b) => (a.votes > b.votes ? -1 : 1));
  });

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          content={anecdote.content}
          id={anecdote.id}
          votes={anecdote.votes}
        />
      ))}
    </div>
  );
}
