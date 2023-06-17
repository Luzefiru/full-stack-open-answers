import { useState } from 'react';

const Blog = ({ blog }) => {
  const [isShowingDetails, setIsShowingDetails] = useState(false);

  const showDetails = () => {
    setIsShowingDetails(!isShowingDetails);
  };

  const buttonText = (() => {
    return isShowingDetails ? 'hide' : 'view';
  })();

  const details = (() => {
    if (isShowingDetails) {
      return (
        <>
          <div>{blog.url}</div>
          <div>
            {blog.likes} <button>like</button>
          </div>
          <div>{blog.user.name}</div>
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

export default Blog;
