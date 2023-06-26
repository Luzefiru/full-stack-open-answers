import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdoteById: (state, action) => {
      return state.map((a) =>
        a.id === action.payload ? { ...a, votes: a.votes + 1 } : a
      );
    },
    addAnecdote: (state, action) => {
      const anecdote = action.payload;
      return state.concat(anecdote);
    },
    setAnecdotes: (_, action) => {
      return action.payload;
    },
  },
});

export const { voteAnecdoteById, addAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
