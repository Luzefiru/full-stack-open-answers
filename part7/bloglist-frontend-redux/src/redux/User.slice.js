import { createSlice } from '@reduxjs/toolkit';
import UserService from '../services/users';

const UserSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (_, action) => action.payload,
  },
});

export const { setUsers } = UserSlice.actions;
export default UserSlice.reducer;

export const initializeUsers = () => {
  return async (dispatch) => {
    const fetchedUsers = await UserService.getAll();
    dispatch(setUsers(fetchedUsers));
  };
};
