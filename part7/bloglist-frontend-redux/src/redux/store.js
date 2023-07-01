import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './Blog.slice';
import notificationReducer from './Notification.slice';

const store = configureStore({
  reducer: { blogs: blogReducer, notification: notificationReducer },
});

export default store;
