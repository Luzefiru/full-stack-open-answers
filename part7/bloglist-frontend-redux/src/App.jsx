import { useEffect } from 'react';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Toggleable';
import { initializeBlogs } from './redux/Blog.slice';
import {
  initializeCurrentUser,
  logoutCurrentUser,
} from './redux/CurrentUser.slice';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => {
    return state.currentUser;
  });

  // effect to load previously logged in user
  useEffect(() => {
    dispatch(initializeCurrentUser());
    dispatch(initializeBlogs());
  }, []);

  const handleLogout = () => {
    dispatch(logoutCurrentUser());
  };

  // show login form only if no currentUser exists
  if (currentUser === null) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    );
  }

  return (
    <>
      <Notification />
      <div>
        <h2>blogs</h2>
        <div>
          {currentUser.name} logged in{' '}
          <button onClick={handleLogout}>Logout</button>
          <br />
          <br />
        </div>

        <Togglable text="New Blog">
          <NewBlogForm currentUser={currentUser} />
        </Togglable>
        <BlogList token={currentUser.token} />
      </div>
    </>
  );
};

export default App;
