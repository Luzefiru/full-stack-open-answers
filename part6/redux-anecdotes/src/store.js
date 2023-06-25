import { filterReducer, anecdoteReducer } from './reducers';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: { filter: filterReducer, anecdotes: anecdoteReducer },
});

export default store;
