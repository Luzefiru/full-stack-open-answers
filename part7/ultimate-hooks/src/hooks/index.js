import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(baseUrl);
        const data = response.data;
        return data;
      } catch (err) {
        console.log(err);
      }
    };

    fetch().then((data) => {
      setResources(data);
    });
  }, [baseUrl]);

  const get = async () => {
    const response = await axios.get(baseUrl);
    setResources(response.data);
  };

  const create = (resource) => {
    axios.post(baseUrl, resource);
    setResources(resources.concat(resource));
  };

  const service = {
    get,
    create,
  };

  return [resources, service];
};
