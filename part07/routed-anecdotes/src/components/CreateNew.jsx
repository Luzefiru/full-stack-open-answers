import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';

const CreateNew = (props) => {
  const navigate = useNavigate();
  const content = useField('text');
  const author = useField('text');
  const info = useField('text');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnecdote = {
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    };

    props.addNew(newAnecdote);
    props.notify(`a new anecdote ${content.value} created!`);
    navigate('/');
  };

  const handleReset = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputProps} />
        </div>
        <div>
          author
          <input {...author.inputProps} />
        </div>
        <div>
          url for more info
          <input {...info.inputProps} />
        </div>
        <button>create</button>
        <button type="button" onClick={handleReset}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
