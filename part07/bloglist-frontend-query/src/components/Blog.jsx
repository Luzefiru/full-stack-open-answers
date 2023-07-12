import { useState } from 'react';
import blogService from '../services/blogs';
import propTypes from 'prop-types';
import { useMutation } from '@tanstack/react-query';

const Blog = ({
  blog,
  refreshBlogs,
  token,
  notifySuccess,
  notifyFailure,
  currentUser,
}) => {
  const [isShowingDetails, setIsShowingDetails] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: ({ blog, token }) => {
      blogService.deleteBlog({ blog, token });
    },
    onSuccess: () => {
      notifySuccess(
        `Successfully removed blog: ${blog.title} by ${blog.author}`
      );
      refreshBlogs();
    },
    onError: (err) => {
      notifyFailure(err.message);
    },
  });

  const likeMutation = useMutation({
    mutationFn: () => {
      blogService.likeBlog(blog);
    },
    onSuccess: () => {
      notifySuccess(`You liked the blog: ${blog.title} by ${blog.author}`);
      refreshBlogs();
    },
    onError: (err) => {
      notifyFailure(err.message);
    },
  });

  const showDetails = () => {
    setIsShowingDetails(!isShowingDetails);
  };

  const buttonText = (() => {
    return isShowingDetails ? 'hide' : 'view';
  })();

  const likeBlog = async () => {
    likeMutation.mutate();
  };

  const deleteBlog = async () => {
    if (currentUser && currentUser.name !== blog.author) {
      notifyFailure('you are not the owner of this blog');
    } else if (
      window.confirm(
        `Are you sure you want to remove blog: ${blog.title} by ${blog.author}?`
      )
    ) {
      deleteMutation.mutate({ blog, token });
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
  blog: propTypes.object.isRequired,
  refreshBlogs: propTypes.func.isRequired,
  token: propTypes.string.isRequired,
  notifySuccess: propTypes.func.isRequired,
  notifyFailure: propTypes.func.isRequired,
};

export default Blog;
