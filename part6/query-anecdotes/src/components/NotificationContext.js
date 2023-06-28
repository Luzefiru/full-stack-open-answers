import { createContext, useReducer } from 'react';

const counterReducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return action.payload;
    case 'remove':
      return '';
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(counterReducer, '');

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
