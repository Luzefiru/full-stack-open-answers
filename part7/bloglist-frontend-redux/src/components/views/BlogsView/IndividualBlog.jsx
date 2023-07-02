import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function IndividualBlog() {
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));

  console.log(id, blog);
  return (
    <div className="IndividualBlog">
      <h1>{blog.title}</h1>
    </div>
  );
}

export default IndividualBlog;
