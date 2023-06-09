import { useState } from 'react';
import propTypes from 'prop-types';

const NewBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateNewBlog = async (e) => {
    const clearBlogForm = () => {
      setTitle('');
      setAuthor('');
      setUrl('');
    };

    e.preventDefault();
    await createBlog({ title, author, url });
    clearBlogForm();
  };

  const handleChange = (setFn) => {
    return (e) => setFn(e.target.value);
  };

  return (
    <div>
      <h1>Create New</h1>
      <form onSubmit={handleCreateNewBlog}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            onChange={handleChange(setTitle)}
            value={title}
            name="title"
            id="title"
            placeholder="Title"
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            onChange={handleChange(setAuthor)}
            value={author}
            name="author"
            id="author"
            placeholder="Author"
          />
        </div>
        <div>
          <label htmlFor="url">URL: </label>
          <input
            onChange={handleChange(setUrl)}
            value={url}
            name="url"
            id="url"
            placeholder="URL"
          />
        </div>

        <button style={{ display: 'block', margin: '8px 0' }} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  createBlog: propTypes.func.isRequired,
};

export default NewBlogForm;
