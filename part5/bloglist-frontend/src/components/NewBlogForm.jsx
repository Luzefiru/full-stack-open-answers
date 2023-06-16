import blogService from '../services/blogs';

const NewBlogForm = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  currentUser,
  blogs,
  setBlogs,
}) => {
  const handleCreateNewBlog = async (e) => {
    const clearBlogForm = () => {
      setTitle('');
      setAuthor('');
      setUrl('');
    };

    e.preventDefault();
    const newBlog = await blogService.createBlog({
      title,
      author,
      url,
      user: currentUser.username,
      token: currentUser.token,
    });

    setBlogs(blogs.concat(newBlog));
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
          />
        </div>
        <div>
          <label htmlFor="author">Author: </label>
          <input
            onChange={handleChange(setAuthor)}
            value={author}
            name="author"
            id="author"
          />
        </div>
        <div>
          <label htmlFor="url">URL: </label>
          <input
            onChange={handleChange(setUrl)}
            value={url}
            name="url"
            id="url"
          />
        </div>

        <button style={{ display: 'block', margin: '8px 0' }} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlogForm;
