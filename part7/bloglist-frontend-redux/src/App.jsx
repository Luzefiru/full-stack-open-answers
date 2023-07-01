import { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Toggleable';
import { initializeBlogs } from './redux/Blog.slice';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  // login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // effect to load previously logged in user
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
    dispatch(initializeBlogs());
  }, []);

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  // show login form only if no currentUser exists
  if (!currentUser) {
    return (
      <>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setCurrentUser={setCurrentUser}
        />
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
