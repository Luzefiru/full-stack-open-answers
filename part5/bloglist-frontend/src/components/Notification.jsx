import { useImperativeHandle, forwardRef, useState } from 'react';

const successStyles = {
  fontSize: '1.5rem',
  border: '2px solid green',
  backgroundColor: 'gainsboro',
  color: 'green',
  padding: '0.5rem',
  borderRadius: '8px',
};

const failureStyles = {
  fontSize: '1.5rem',
  border: '2px solid red',
  backgroundColor: 'gainsboro',
  color: 'red',
  padding: '0.5rem',
  borderRadius: '8px',
};

const Notification = (_, ref) => {
  // notification state
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  const notifySuccess = (str) => {
    setMessage(str);
    setType('success');

    setTimeout(() => {
      setMessage('');
      setType('');
    }, 5000);
  };

  const notifyFailure = (str) => {
    setMessage(str);
    setType('failure');

    setTimeout(() => {
      setMessage('');
      setType('');
    }, 5000);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        notifySuccess,
        notifyFailure,
      };
    },
    []
  );

  if (message) {
    return (
      <div
        className="Notification"
        style={type === 'success' ? successStyles : failureStyles}
      >
        {message}
      </div>
    );
  }
};

export default forwardRef(Notification);
