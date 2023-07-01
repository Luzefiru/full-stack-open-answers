import { createSlice } from '@reduxjs/toolkit';

const NotificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', type: '' },
  reducers: {
    setMessage: (state, action) => {
      return { message: action.payload, type: state.type };
    },
    setType: (state, action) => {
      return { type: action.payload, message: state.message };
    },
  },
});

export const { setMessage, setType } = NotificationSlice.actions;
export default NotificationSlice.reducer;

export const notifySuccess = (str) => {
  return (dispatch) => {
    dispatch(setMessage(str));
    dispatch(setType('success'));

    setTimeout(() => {
      dispatch(setMessage(''));
      dispatch(setType(''));
    }, 5000);
  };
};

export const notifyFailure = (str) => {
  return (dispatch) => {
    dispatch(setMessage(str));
    dispatch(setType('failure'));

    setTimeout(() => {
      dispatch(setMessage(''));
      dispatch(setType(''));
    }, 5000);
  };
};
