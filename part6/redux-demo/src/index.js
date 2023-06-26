import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';

import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './reducers/filterReducer';
import noteReducer from './reducers/noteReducer';

const store = configureStore({
  reducer: { notes: noteReducer, filter: filterReducer },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
