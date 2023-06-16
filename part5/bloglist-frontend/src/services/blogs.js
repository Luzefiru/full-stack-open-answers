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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog };
