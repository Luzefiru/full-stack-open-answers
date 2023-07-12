import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createBlog = async ({ title, author, url, user, token }) => {
  const response = await axios.post(
    baseUrl,
    { title, author, url, user },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};

const likeBlog = async (blog) => {
  const blogId = blog.id;
  // serializing the user field into ObjectId data type to match Blog schema
  blog.user = blog.user.id;
  delete blog.id;

  const response = await axios.patch(`${baseUrl}/${blogId}`, {
    ...blog,
    likes: blog.likes + 1,
  });

  const updatedBlog = response.data;
  return updatedBlog;
};

const deleteBlog = ({ blog, token }) => {
  axios
    .delete(`${baseUrl}/${blog.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .catch((err) => {
      return err;
    });
};

export default { getAll, createBlog, likeBlog, deleteBlog };
