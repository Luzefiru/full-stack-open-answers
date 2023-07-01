import Blog from './Blog';
import { useSelector } from 'react-redux';

function BlogList({ token }) {
  const blogs = useSelector((state) => state.blogs).slice();

  return (
    <div>
      {blogs
        .sort((a, b) => {
          return a.likes < b.likes ? 1 : -1;
        })
        .map((blog) => (
          <Blog key={blog.id} blog={blog} token={token} />
        ))}
    </div>
  );
}

export default BlogList;
