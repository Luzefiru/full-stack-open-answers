import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    changeNotificationMessage: (_, action) => {
      return action.payload;
    },
    clearNotification: (_, __) => {
      return '';
    },
  },
});

export const { changeNotificationMessage, clearNotification } =
  notificationSlice.actions;

export const setNotification = (text, timeoutSeconds) => {
  const timeoutMiliseconds = timeoutSeconds * 1000;

  return async (dispatch) => {
    dispatch(changeNotificationMessage(text));
    setTimeout(() => {
      dispatch(clearNotification());
    }, timeoutMiliseconds);
  };
};

export default notificationSlice.reducer;
