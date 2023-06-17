import { useState } from 'react';

const Togglable = ({ text, children }) => {
  const [isShowing, setIsShowing] = useState('false');

  const toggleVisibility = () => {
    setIsShowing(!isShowing);
  };

  return isShowing ? (
    <button onClick={toggleVisibility} style={{ marginBottom: '16px' }}>
      {text}
    </button>
  ) : (
    <>
      {children}
      <button onClick={toggleVisibility} style={{ marginBottom: '16px' }}>
        Cancel
      </button>
    </>
  );
};

export default Togglable;
