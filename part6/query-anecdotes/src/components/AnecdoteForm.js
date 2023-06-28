import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useContext } from 'react';
import NotificationContext from './NotificationContext';

const AnecdoteForm = () => {
  const [_, notificationDispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();
  const createAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      queryClient.setQueryData(['anecdotes'], (prev) => prev.concat(data));
    },
    onError: ({ response }) => {
      notificationDispatch({
        type: 'set',
        payload: response.data.error,
      });
      setTimeout(() => {
        notificationDispatch({ type: 'remove' });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    notificationDispatch({
      type: 'set',
      payload: `You created anecdote '${content}'`,
    });
    setTimeout(() => {
      notificationDispatch({ type: 'remove' });
    }, 5000);
    createAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
