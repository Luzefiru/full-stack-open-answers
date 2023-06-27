import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

export const getAnecdotes = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const createAnecdote = async (content) => {
  try {
    const response = await axios.post(baseUrl, { votes: 0, content });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const incrementAnecdoteVotes = async (id) => {
  try {
    const getResponse = await axios.get(`${baseUrl}/${id}`);
    const targetAnecdote = getResponse.data;
    const patchResponse = await axios.patch(`${baseUrl}/${id}`, {
      ...targetAnecdote,
      votes: targetAnecdote.votes + 1,
    });
    return patchResponse.data;
  } catch (err) {
    throw err;
  }
};
