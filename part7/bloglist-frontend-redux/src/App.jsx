import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Toggleable';
import { initializeBlogs } from './redux/Blog.slice';
import { useDispatch, useSelector } from 'react-redux';
import { notifySuccess, notifyFailure } from './redux/Notification.slice';

const App = () => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState(useSelector((state) => state.blogs));

  // login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // effect to load previously logged in user
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
    dispatch(initializeBlogs());
  }, []);

  const refreshBlogs = async () => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const createBlog = async ({ title, author, url }) => {
    try {
      const newBlog = await blogService.createBlog({
        title,
        author,
        url,
        user: currentUser.username,
        token: currentUser.token,
      });

      setBlogs(blogs.concat(newBlog));
      dispatch(
        notifySuccess(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      );

      return newBlog;
    } catch (err) {
      dispatch(notifyFailure(err.message));
    }
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
          <NewBlogForm createBlog={createBlog} />
        </Togglable>

        {blogs
          .sort((a, b) => {
            return a.likes < b.likes ? 1 : -1;
          })
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              refreshBlogs={refreshBlogs}
              token={currentUser.token}
            />
          ))}
      </div>
    </>
  );
};

export default App;
