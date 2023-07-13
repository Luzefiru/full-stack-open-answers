import React from 'react';

function Todo({ children }) {
  return (
    <div
      className="Todo"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: '70%',
        margin: 'auto',
      }}
    >
      {children}
    </div>
  );
}

export default Todo;
