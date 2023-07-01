import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './Blog.slice';
import notificationReducer from './Notification.slice';
import currentUserReducer from './CurrentUser.slice';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    currentUser: currentUserReducer,
  },
});

export default store;
