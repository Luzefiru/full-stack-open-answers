import { combineReducers } from 'redux';

import filterReducer from './filterReducer';
import anecdoteReducer from './anecdoteReducer';

const reducer = combineReducers({
  filter: filterReducer,
  anecdotes: anecdoteReducer,
});

export default reducer;
