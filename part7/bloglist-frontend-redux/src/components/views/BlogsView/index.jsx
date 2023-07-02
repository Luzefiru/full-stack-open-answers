import { useSelector } from 'react-redux';
import Togglable from './Toggleable';
import BlogList from '../../BlogList';
import NewBlogForm from './NewBlogForm';

const BlogsView = () => {
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <div className="BlogView">
      <Togglable text="New Blog">
        <NewBlogForm currentUser={currentUser} />
      </Togglable>
      <BlogList token={currentUser.token} />
    </div>
  );
};

export default BlogsView;
