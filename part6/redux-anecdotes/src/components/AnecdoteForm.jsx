import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addAnecdote } from '../reducers/anecdoteReducer';
import { createAnecdote } from '../services/anecdotes.service';

export default function NewAnecdoteForm() {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createAnecdote(content).then((newAnecdote) => {
      dispatch(addAnecdote(newAnecdote));
      setContent('');
    });
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  );
}
