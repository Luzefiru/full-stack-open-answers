import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { notifyFailure, notifySuccess } from './Notification.slice';

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

export const createBlog = ({ title, author, url, username, token }) => {
  return async (dispatch, getState) => {
    try {
      const newBlog = await blogService.createBlog({
        title,
        author,
        url,
        user: username,
        token: token,
      });

      dispatch(setBlogs(getState().blogs.concat(newBlog)));
      dispatch(
        notifySuccess(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      );
    } catch (err) {
      dispatch(notifyFailure(err.message));
    }
  };
};

export const refreshBlogs = () => {
  return async (dispatch) => {
    const fetchedBlogs = await blogService.getAll();
    dispatch(setBlogs(fetchedBlogs));
  };
};

export const postComment = (blogId, comment, token) => {
  return async (dispatch) => {
    try {
      await blogService.postComment({ blogId, comment, token });
      dispatch(notifySuccess('You successfully left a comment.'));
      dispatch(refreshBlogs());
    } catch (err) {
      dispatch(notifyFailure(err.message));
    }
  };
};
