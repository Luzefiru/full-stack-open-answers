import { useState } from 'react';
import blogService from '../services/blogs';
import propTypes from 'prop-types';

const Blog = ({ blog, refreshBlogs, token, notifySuccess, notifyFailure }) => {
  const [isShowingDetails, setIsShowingDetails] = useState(false);

  const showDetails = () => {
    setIsShowingDetails(!isShowingDetails);
  };

  const buttonText = (() => {
    return isShowingDetails ? 'hide' : 'view';
  })();

  const likeBlog = async () => {
    try {
      notifySuccess(`You liked the blog: ${blog.title} by ${blog.author}`);
      await blogService.likeBlog(blog);
      refreshBlogs();
    } catch (err) {
      notifyFailure(err.message);
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
        notifySuccess(
          `Successfully removed blog: ${blog.title} by ${blog.author}`
        );
        refreshBlogs();
      } catch (err) {
        notifyFailure(err.response.data.error);
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
  refreshBlogs: propTypes.func.isRequired,
  token: propTypes.string.isRequired,
  notifySuccess: propTypes.func.isRequired,
  notifyFailure: propTypes.func.isRequired,
};

export default Blog;
