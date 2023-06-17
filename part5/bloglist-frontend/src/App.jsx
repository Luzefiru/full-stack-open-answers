import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Toggleable';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  // login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // Notification ref
  const notifRef = useRef(null);

  // effect to get blog list
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // effect to load previously logged in user
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
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
      notifRef.current.notifySuccess(
        `a new blog ${newBlog.title} by ${newBlog.author} added`
      );

      return newBlog;
    } catch (err) {
      notifRef.current.notifyFailure(err.message);
    }
  };

  // show login form only if no currentUser exists
  if (!currentUser) {
    return (
      <>
        <Notification ref={notifRef} />
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setCurrentUser={setCurrentUser}
          notifyFailure={(str) => {
            notifRef.current.notifyFailure(str);
          }}
        />
      </>
    );
  }

  return (
    <>
      <Notification ref={notifRef} />
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

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} refreshBlogs={refreshBlogs} />
        ))}
      </div>
    </>
  );
};

export default App;
