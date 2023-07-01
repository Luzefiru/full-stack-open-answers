import axios from 'axios';
const baseUrl = '/api/login';

const login = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password });
  return response.data; // has { token, username, name }
};

export default { login };
