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

const Notification = ({ message, type }) => {
  if (message) {
    return (
      <div style={type === 'success' ? successStyles : failureStyles}>
        {message}
      </div>
    );
  }
};

export default Notification;
