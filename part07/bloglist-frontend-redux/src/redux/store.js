import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './Blog.slice';
import userReducer from './User.slice';
import notificationReducer from './Notification.slice';
import currentUserReducer from './CurrentUser.slice';

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    users: userReducer,
    notification: notificationReducer,
    currentUser: currentUserReducer,
  },
});

export default store;
