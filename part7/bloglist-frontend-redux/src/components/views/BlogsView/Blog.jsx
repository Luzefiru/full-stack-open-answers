import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <div
      className="Blog"
      style={{ border: '2px solid black', borderRadius: '4px', padding: '8px' }}
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
