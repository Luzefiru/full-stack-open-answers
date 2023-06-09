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
import {
  default as CurrentUserReducer,
  setUser,
  logoutUser,
  initializeUser,
} from './reducers/CurrentUser.reducer';
import { useQuery, useMutation } from '@tanstack/react-query';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  // login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // reducer for notifications
  const [notification, dispatchNotification] = useReducer(NotificationReducer, {
    message: '',
    type: '',
  });

  // reducer for currentUser
  const [currentUser, dispatchCurrentUser] = useReducer(CurrentUserReducer, {
    username: null,
    name: null,
    token: null,
  });

  const notifySuccess = (str) => {
    dispatchNotification(success(str));
    setTimeout(() => {
      dispatchNotification(clear());
    }, 5000);
  };

  const notifyFailure = (str) => {
    dispatchNotification(failure(str));
    setTimeout(() => {
      dispatchNotification(clear());
    }, 5000);
  };

  const { isLoading, isError, error, refetch } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(),
    onSuccess: (blogs) => {
      setBlogs(blogs);
    },
  });

  const refreshBlogs = () => {
    refetch();
  };

  // effect to load previously logged in user
  useEffect(() => {
    dispatchCurrentUser(initializeUser());
  }, []);

  const handleLogout = () => {
    dispatchCurrentUser(logoutUser());
  };

  const mutation = useMutation({
    mutationFn: ({ title, author, url }) =>
      blogService.createBlog({
        title,
        author,
        url,
        user: currentUser.username,
        token: currentUser.token,
      }),
    onSuccess: (newBlog) => {
      notifySuccess(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      refreshBlogs();
    },
    onFailure: (err) => notifyFailure(err.message),
  });

  const createBlog = async ({ title, author, url }) => {
    mutation.mutate({ title, author, url });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log(error);
    return <div>An error occured. Check the logs.</div>;
  }

  // show login form only if no currentUser exists
  if (currentUser.token === null) {
    return (
      <>
        <Notification {...notification} />
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          setCurrentUser={({ username, name, token }) => {
            dispatchCurrentUser(setUser({ username, name, token }));
          }}
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
              currentUser={currentUser}
            />
          ))}
      </div>
    </>
  );
};

export default App;
