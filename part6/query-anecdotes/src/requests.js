import axios from 'axios';
const baseUrl = 'http://127.0.0.1:3001/anecdotes';

export const getAnecdotes = async () => {
  return axios.get(baseUrl).then((res) => res.data);
};

export const createAnecdote = async (content) => {
  return axios.post(baseUrl, { content, votes: 0 }).then((res) => res.data);
};
