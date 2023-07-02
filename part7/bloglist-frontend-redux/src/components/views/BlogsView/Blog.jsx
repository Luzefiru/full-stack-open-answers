import { useState } from 'react';
import blogService from '../../../services/blogs';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
  notifyFailure,
  notifySuccess,
} from '../../../redux/Notification.slice';
import { refreshBlogs } from '../../../redux/Blog.slice';

const Blog = ({ blog, token }) => {
  const dispatch = useDispatch();
  const [isShowingDetails, setIsShowingDetails] = useState(false);

  const showDetails = () => {
    setIsShowingDetails(!isShowingDetails);
  };

  const buttonText = (() => {
    return isShowingDetails ? 'hide' : 'view';
  })();

  const likeBlog = async () => {
    try {
      await blogService.likeBlog(blog);
      dispatch(
        notifySuccess(`You liked the blog: ${blog.title} by ${blog.author}`)
      );
      dispatch(refreshBlogs());
    } catch (err) {
      console.log(err);
      dispatch(notifyFailure(err.message));
    }
  };

  const deleteBlog = async () => {
    if (
      window.confirm(
        `Are you sure you want to remove blog: ${blog.title} by ${blog.author}?`
      )
    ) {
      try {
        await blogService.deleteBlog({ blog, token });
        dispatch(
          notifySuccess(
            `Successfully removed blog: ${blog.title} by ${blog.author}`
          )
        );
        dispatch(refreshBlogs());
      } catch (err) {
        dispatch(notifyFailure(err.response.data.error));
      }
    }
  };

  const details = (() => {
    if (isShowingDetails) {
      return (
        <>
          <div>{blog.url}</div>
          <div>
            {blog.likes} <button onClick={likeBlog}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <button
            onClick={deleteBlog}
            style={{
              backgroundColor: 'firebrick',
              color: 'white',
              border: 'unset',
              padding: '4px 8px',
              marginTop: '4px',
              borderRadius: '4px',
            }}
          >
            Remove
          </button>
        </>
      );
    }
  })();

  return (
    <div
      className="Blog"
      style={{ border: '2px solid black', borderRadius: '4px', padding: '8px' }}
    >
      {blog.title} {blog.author}{' '}
      <button onClick={showDetails}>{buttonText}</button>
      {details}
    </div>
  );
};

Blog.propTypes = {
  blog: propTypes.shape({
    title: propTypes.string.isRequired,
    author: propTypes.string,
    url: propTypes.string.isRequired,
    likes: propTypes.number.isRequired,
    user: propTypes.object.isRequired,
  }),
  token: propTypes.string.isRequired,
};

export default Blog;
