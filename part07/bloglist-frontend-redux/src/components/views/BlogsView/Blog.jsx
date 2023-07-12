import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <div
      style={{
        border: '2px solid gainsboro',
        borderRadius: '8px',
        padding: '16px 8px',
        margin: '16px 0px',
      }}
    >
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>{' '}
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
};

export default Blog;
