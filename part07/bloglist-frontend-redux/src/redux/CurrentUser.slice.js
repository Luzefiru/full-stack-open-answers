import { createSlice } from '@reduxjs/toolkit';
import loginServce from '../services/login';
import { notifyFailure } from './Notification.slice';

const CurrentUserSlice = createSlice({
  name: 'currentUser',
  initialState: null,
  reducers: {
    setCurrentUser: (_, action) => action.payload,
    initializeCurrentUser: () => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      return currentUser;
    },
    logoutCurrentUser: () => {
      localStorage.removeItem('currentUser');
      return null;
    },
  },
});

export const { setCurrentUser, initializeCurrentUser, logoutCurrentUser } =
  CurrentUserSlice.actions;
export default CurrentUserSlice.reducer;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    loginServce
      .login(username, password)
      .then((currentUserData) => {
        dispatch(setCurrentUser(currentUserData));
        localStorage.setItem('currentUser', JSON.stringify(currentUserData));
      })
      .catch(() => {
        dispatch(notifyFailure('wrong username or password'));
      });
  };
};
