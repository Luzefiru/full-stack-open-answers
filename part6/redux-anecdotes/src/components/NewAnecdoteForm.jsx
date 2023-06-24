import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addAnecdote } from '../reducers/anecdoteReducer';

export default function NewAnecdoteForm() {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addAnecdote(content));
    setContent('');
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
