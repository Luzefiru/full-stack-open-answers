import { useState, useEffect, useReducer } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Notification from './components/Notification';
import Togglable from './components/Toggleable';
import {
  default as NotificationReducer,
  success,
  failure,
  clear,
} from './reducers/Notification.reducer';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const App = () => {
  const queryClient = useQueryClient();

  const [blogs, setBlogs] = useState([]);

  // login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // reducer for notifications
  const [notification, dispatch] = useReducer(NotificationReducer, {
    message: '',
    type: '',
  });

  const notifySuccess = (str) => {
    dispatch(success(str));
    setTimeout(() => {
      dispatch(clear());
    }, 5000);
  };

  const notifyFailure = (str) => {
    dispatch(failure(str));
    setTimeout(() => {
      dispatch(clear());
    }, 5000);
  };

  const { isLoading, isError, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
  });

  const refreshBlogs = () => {
    queryClient.invalidateQueries(['blogs']);
  };

  // effect to get blog list
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // effect to load previously logged in user
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
  }, []);

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
      notifySuccess(`a new blog ${newBlog.title} by ${newBlog.author} added`);

      return newBlog;
    } catch (err) {
      notifyFailure(err.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log(error);
    return <div>An error occured. Check the logs.</div>;
  }

  // show login form only if no currentUser exists
  if (!currentUser) {
    return (
      <>
        <Notification {...notification} />
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setCurrentUser={setCurrentUser}
          notifyFailure={notifyFailure}
        />
      </>
    );
  }

  return (
    <>
      <Notification {...notification} />
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
              notifySuccess={notifySuccess}
              notifyFailure={notifyFailure}
            />
          ))}
      </div>
    </>
  );
};

export default App;
