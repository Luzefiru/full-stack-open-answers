import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';

const getCountries = async () => {
  const response = await axios.get(`${baseUrl}/all`);
  return response.data;
};

const getCountryData = async (countryName) => {
  const response = await axios.get(`${baseUrl}/name/${countryName}`);
  return response.data;
};

const exports = { getCountries, getCountryData };

export default exports;
