import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { configureStore } from '@reduxjs/toolkit';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    case 'ZERO':
      return 0;
    default: // if none of the above matches, code comes here
      return state;
  }
};

const store = configureStore({ reducer: counterReducer });
store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
});

const App = () => {
  return (
    <div>
      <div>{store.getState()}</div>
      <button onClick={(e) => store.dispatch({ type: 'INCREMENT' })}>
        plus
      </button>
      <button onClick={(e) => store.dispatch({ type: 'DECREMENT' })}>
        minus
      </button>
      <button onClick={(e) => store.dispatch({ type: 'ZERO' })}>zero</button>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
const renderApp = () => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

renderApp();
store.subscribe(renderApp);