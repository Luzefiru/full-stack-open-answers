const NotificationReducer = (_, action) => {
  if (action.type === 'success') {
    return { message: action.payload.message, type: 'success' };
  } else if (action.type === 'failure') {
    return { message: action.payload.message, type: 'failure' };
  } else if (action.type === 'clear') {
    return { message: '', type: '' };
  } else {
    throw new Error('Error: Invalid reducer action.type!');
  }
};

export const success = (str) => {
  return {
    type: 'success',
    payload: {
      message: str,
    },
  };
};

export const failure = (str) => {
  return {
    type: 'failure',
    payload: {
      message: str,
    },
  };
};

export const clear = () => {
  return {
    type: 'clear',
  };
};

export default NotificationReducer;
