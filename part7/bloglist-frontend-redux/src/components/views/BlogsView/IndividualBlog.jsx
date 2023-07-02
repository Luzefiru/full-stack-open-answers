import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  notifyFailure,
  notifySuccess,
} from '../../../redux/Notification.slice';
import { refreshBlogs } from '../../../redux/Blog.slice';
import blogService from '../../../services/blogs';
import { useNavigate } from 'react-router-dom';

function IndividualBlog() {
  const { id } = useParams();
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id));
  const token = useSelector((state) => state.currentUser.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(blog);

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
        navigate('/', { replace: true });
      } catch (err) {
        dispatch(notifyFailure(err.response.data.error));
      }
    }
  };

  return (
    <div className="IndividualBlog">
      <h1>
        {blog.title} {blog.author}
      </h1>
      <div>{blog.url}</div>
      <div>
        {blog.likes} <button onClick={likeBlog}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
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
      <h3>comments</h3>
      {blog.comments.length > 0 ? (
        <ul>
          {blog.comments.map((comment) => {
            return <li key={comment}>{comment}</li>;
          })}
        </ul>
      ) : (
        <div>There are no comments yet!</div>
      )}
    </div>
  );
}

export default IndividualBlog;
