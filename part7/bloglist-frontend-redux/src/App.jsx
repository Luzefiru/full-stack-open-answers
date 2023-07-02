import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
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
import styles from './App.module.css';

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
      <header className={styles.nav}>
        <div className={styles.navLinkList}>
          <Link className={styles.navLink} to="/">
            blogs
          </Link>
          <Link className={styles.navLink} to="/users">
            users
          </Link>
        </div>
        <div className={styles.navUser}>
          <span>Welcome, {currentUser.name}</span>
          <button className={styles.logout} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>
      <div className={styles.appContainer}>
        <Notification />
        <h2 className={styles.titleHeading}>Blog App</h2>
        <Routes>
          <Route path="/" element={<BlogsView />} />
          <Route path="/users" element={<UsersView />} />
          <Route path="/users/:id" element={<IndividualUser />} />
          <Route path="/blogs/:id" element={<IndividualBlog />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
