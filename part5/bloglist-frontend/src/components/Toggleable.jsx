import { useState } from 'react';
import propTypes from 'prop-types';

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

Togglable.propTypes = {
  text: propTypes.string.isRequired,
  children: propTypes.any.isRequired,
};

export default Togglable;
