import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

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

  // show login form only if no currentUser exists
  if (!currentUser) {
    return (
      <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        setCurrentUser={setCurrentUser}
      />
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {currentUser.name} logged in{' '}
        <button onClick={handleLogout}>Logout</button>
        <br />
        <br />
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
