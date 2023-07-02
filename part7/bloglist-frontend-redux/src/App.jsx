import { useEffect } from 'react';
import BlogsView from './components/views/BlogsView';
import UsersView from './components/views/UsersView';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { initializeBlogs } from './redux/Blog.slice';
import { initializeCurrentUser } from './redux/CurrentUser.slice';
import { useDispatch, useSelector } from 'react-redux';
import { logoutCurrentUser } from './redux/CurrentUser.slice';

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
    console.log('logging out');
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
      <h2>blogs</h2>
      <div>
        {currentUser.name} logged in{' '}
        <button onClick={handleLogout}>Logout</button>
        <br />
        <br />
      </div>
      {currentUser === true ? <BlogsView /> : ''}
      <UsersView />
    </>
  );
};

export default App;
