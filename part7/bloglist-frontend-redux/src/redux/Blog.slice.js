import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const BlogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (_, action) => {
      return action.payload;
    },
  },
});

export const { setBlogs } = BlogSlice.actions;
export default BlogSlice.reducer;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const fetchedBlogs = await blogService.getAll();
    dispatch(setBlogs(fetchedBlogs));
  };
};
