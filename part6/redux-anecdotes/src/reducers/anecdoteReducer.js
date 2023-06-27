import { createSlice } from '@reduxjs/toolkit';
import {
  getAnecdotes,
  createAnecdote,
  incrementAnecdoteVotes,
} from '../services/anecdotes.service';
import { setNotification, clearNotification } from './notificationReducer';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote: (state, action) => {
      const id = action.payload;
      return state.map((a) => (a.id === id ? { ...a, votes: a.votes + 1 } : a));
    },
    setAnecdotes: (_, action) => {
      return action.payload;
    },
  },
});

export const { setAnecdotes, voteAnecdote } = anecdoteSlice.actions;

export const voteAnecdoteById = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await incrementAnecdoteVotes(id);
    if (updatedAnecdote !== undefined) {
      dispatch(voteAnecdote(id));
      dispatch(setNotification(`You voted '${updatedAnecdote.content}'`));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    } else {
      dispatch(setNotification('There was an error voting for the anecdote.'));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }
  };
};

export const addAnecdote = (content) => {
  return async (dispatch, getState) => {
    const newAnecdote = await createAnecdote(content);
    if (newAnecdote !== undefined) {
      dispatch(setAnecdotes(getState().anecdotes.concat(newAnecdote)));
      return newAnecdote;
    }
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAnecdotes();
    dispatch(setAnecdotes(anecdotes));
  };
};

export default anecdoteSlice.reducer;
