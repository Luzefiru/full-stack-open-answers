import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';
const API_KEY = process.env.REACT_APP_API_KEY;

const getCountries = async () => {
  const response = await axios.get(`${baseUrl}/all`);
  return response.data;
};

const getCountryData = async (countryName) => {
  const response = await axios.get(`${baseUrl}/name/${countryName}`);
  return response.data;
};

const getCountryWeather = async (capitalName) => {
  console.log(API_KEY);
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${capitalName}&appid=${API_KEY}`
  );
  return response.data;
};

const exports = { getCountries, getCountryData, getCountryWeather };

export default exports;
