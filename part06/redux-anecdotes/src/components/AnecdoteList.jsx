import { useSelector } from 'react-redux';
import Anecdote from './Anecdote';

export default function AnecdoteList() {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    const anecdotesSortedByVotes = [...anecdotes].sort((a, b) =>
      a.votes > b.votes ? -1 : 1
    );

    const filteredAnecdotes = anecdotesSortedByVotes.filter(
      (a) => a.content.indexOf(filter) !== -1
    );

    return filteredAnecdotes;
  });

  return (
    <div>
      {anecdotes.map(({ id, content, votes }) => (
        <Anecdote key={id} content={content} id={id} votes={votes} />
      ))}
    </div>
  );
}
