import { useDispatch } from 'react-redux';
import { voteAnecdoteById } from '../reducers/anecdoteReducer';

export default function Anecdote({ content, id, votes }) {
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdoteById(id));
  };

  return (
    <div>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={() => vote(id)}>vote</button>
      </div>
    </div>
  );
}
