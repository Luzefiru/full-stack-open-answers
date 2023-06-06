import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createPerson = async (person) => {
  const response = await axios.post(baseUrl, person);
  return response.data;
};

const deletePerson = async (personId) => {
  const response = await axios.delete(`${baseUrl}/${personId}`);
  console.log(response);
};

const exports = { getAll, createPerson, deletePerson };

export default exports;
