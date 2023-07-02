import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import IndividualUser from './components/views/UsersView/IndividualUser';
import IndividualBlog from './components/views/BlogsView/IndividualBlog';
import BlogsView from './components/views/BlogsView';
import UsersView from './components/views/UsersView';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './redux/Blog.slice';
import { initializeCurrentUser } from './redux/CurrentUser.slice';
import { initializeUsers } from './redux/User.slice';
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
    dispatch(initializeUsers());
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
      <Routes>
        <Route path="/" element={<BlogsView />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/users/:id" element={<IndividualUser />} />
        <Route path="/blogs/:id" element={<IndividualBlog />} />
      </Routes>
    </>
  );
};

export default App;
