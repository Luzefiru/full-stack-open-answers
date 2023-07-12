const CurrentUserReducer = (_, action) => {
  if (action.type === 'set') {
    return {
      username: action.payload.username,
      name: action.payload.name,
      token: action.payload.token,
    };
  } else if (action.type === 'logout') {
    localStorage.removeItem('currentUser');
    return {
      username: null,
      name: null,
      token: null,
    };
  } else {
    throw new Error('Invalid action.type in CurrentUserReducer.');
  }
};

export const setUser = ({ username, name, token }) => {
  return {
    type: 'set',
    payload: {
      username,
      name,
      token,
    },
  };
};

export const logoutUser = () => {
  return {
    type: 'logout',
  };
};

export const initializeUser = () => {
  const cachedUser = JSON.parse(localStorage.getItem('currentUser'));
  if (cachedUser === null) {
    return {
      type: 'set',
      payload: {
        username: null,
        name: null,
        token: null,
      },
    };
  } else {
    const { username, name, token } = cachedUser;
    return {
      type: 'set',
      payload: {
        username,
        name,
        token,
      },
    };
  }
};

export default CurrentUserReducer;
