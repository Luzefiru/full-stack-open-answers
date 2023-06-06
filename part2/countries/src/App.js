import { useState, useEffect } from 'react';
import services from './services';
import Country from './Country';

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState(null);

  const getFilteredCountries = () => {
    let country = countries.filter(
      (c) => c.name.common.toLowerCase() === search.toLowerCase()
    );
    if (country.length === 1) {
      return country;
    }
    return countries.filter(
      (c) => c.name.common.toLowerCase().indexOf(search.toLowerCase()) === 0
    );
  };

  useEffect(() => {
    async function fetchAllCountries() {
      const allCountries = await services.getCountries();
      setCountries(allCountries);
    }
    fetchAllCountries();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const displayCountries = () => {
    if (getFilteredCountries().length > 10) {
      return 'Too many matches, specify another filter';
    } else if (getFilteredCountries().length > 1) {
      return getFilteredCountries().map((c) => (
        <div key={c.name.common}>{c.name.common}</div>
      ));
    } else if (getFilteredCountries().length === 1) {
      const country = getFilteredCountries()[0];
      return <Country key={country.name.common} country={country} />;
    } else {
      return "Can't find a country with that filter. Try again.";
    }
  };

  if (!countries) {
    return <div>Fetching data from server...</div>;
  }

  return (
    <div className="App">
      find countries <input onChange={handleChange} value={search} />
      <div>{displayCountries()}</div>
    </div>
  );
}

export default App;
