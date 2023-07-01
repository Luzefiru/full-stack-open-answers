import { notifyFailure } from '../redux/Notification.slice';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/CurrentUser.slice';
import { useState } from 'react';

const LoginForm = () => {
  // login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginUser(username, password));
      setUsername('');
      setPassword('');
    } catch (err) {
      dispatch(notifyFailure('wrong username or password'));
    }
  };

  const handleChange = (setFn) => {
    return (e) => setFn(e.target.value);
  };

  return (
    <div>
      <h1>log in to application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username{' '}
          <input
            id="username"
            value={username}
            onChange={handleChange(setUsername)}
          />
        </div>
        <div>
          password{' '}
          <input
            id="password"
            value={password}
            type="password"
            onChange={handleChange(setPassword)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
