import {
  filterReducer,
  anecdoteReducer,
  notificationReducer,
} from './reducers';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    filter: filterReducer,
    anecdotes: anecdoteReducer,
    notification: notificationReducer,
  },
});

export default store;
