import axios from 'axios';
const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const createBlog = async ({ title, author, url, user, token }) => {
  const response = await axios.post(
    baseUrl,
    { title, author, url, user },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response.data;
};

const likeBlog = async (blogRef) => {
  const blog = structuredClone(blogRef);
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

const deleteBlog = async ({ blog, token }) => {
  await axios.delete(`${baseUrl}/${blog.id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default { getAll, createBlog, likeBlog, deleteBlog };
