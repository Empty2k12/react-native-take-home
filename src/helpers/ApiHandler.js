import axios from 'axios';
import axiosRetry from 'axios-retry';
const baseURL = 'https://jsonplaceholder.typicode.com/';

axiosRetry(axios, {
  retries: 3, // number of retries
  retryDelay: retryCount => retryCount * 4000, // time interval between retries
  retryCondition: error => {
    return (
      typeof error.response === 'undefined' || error.response.status >= 500
    );
  },
});

async function APIHandler(type, ending) {
  try {
    if (type.toLowerCase() === 'post') {
      const response = await axios.post(`${baseURL}${ending}`, null, {
        withCredentials: true,
      });
      return response.data;
    } else if (type.toLowerCase() === 'get') {
      const response = await axios.get(`${baseURL}${ending}`);
      return response.data;
    } else {
      throw new Error('Invalid request type');
    }
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

export default APIHandler;
