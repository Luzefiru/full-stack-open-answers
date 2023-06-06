import { useEffect, useState } from 'react';
import services from './services';

const Country = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    services.getCountryWeather(country.capital).then((data) => {
      setWeatherData(data);
    });
  }, [country.capital]);

  const displayWeatherData = () => {
    function kelvinToCelsius(kelvin) {
      return kelvin - 273.15;
    }

    if (weatherData === null) {
      return 'Loading weather data. Please wait...';
    } else {
      return (
        <>
          <div>
            temperature{' '}
            {kelvinToCelsius(weatherData.main.feels_like).toFixed(2)} Celcius
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt={weatherData.weather[0].main}
          />
          <div>wind {weatherData.wind.speed} m/s</div>
        </>
      );
    }
  };

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h4>languages:</h4>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Weather in {country.capital}</h2>
      {displayWeatherData()}
    </div>
  );
};

export default Country;
