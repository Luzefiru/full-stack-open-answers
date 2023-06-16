import loginService from '../services/login';

const LoginForm = ({
  username,
  setUsername,
  password,
  setPassword,
  setCurrentUser,
}) => {
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('handling');
    const resetLoginForm = () => {
      setUsername('');
      setPassword('');
    };

    const data = await loginService.login(username, password);

    setCurrentUser({
      username: data.username,
      name: data.name,
      token: data.token,
    });

    localStorage.setItem('currentUser', {
      name: data.name,
      username: data.username,
      token: data.token,
    });

    resetLoginForm();
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
          <input value={username} onChange={handleChange(setUsername)} />
        </div>
        <div>
          password{' '}
          <input
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
