import { useDispatch } from 'react-redux';
import { voteAnecdoteById } from '../reducers/anecdoteReducer';
import {
  setNotification,
  clearNotification,
} from '../reducers/notificationReducer';
import { incrementAnecdoteVotes } from '../services/anecdotes.service';

export default function Anecdote({ content, id, votes }) {
  const dispatch = useDispatch();

  const vote = (id) => {
    incrementAnecdoteVotes(id)
      .then((updatedAnecdote) => {
        if (updatedAnecdote !== undefined) {
          dispatch(voteAnecdoteById(id));
          dispatch(setNotification(`You voted '${content}'`));
          setTimeout(() => {
            dispatch(clearNotification());
          }, 5000);
        }
      })
      .catch((err) => {
        dispatch(setNotification(err.message));
        setTimeout(() => {
          dispatch(clearNotification());
        }, 5000);
      });
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
