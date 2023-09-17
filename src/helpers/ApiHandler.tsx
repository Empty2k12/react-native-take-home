import axios, { AxiosResponse, AxiosError } from 'axios';
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

async function APIHandler(type: 'post' | 'get', ending: string): Promise<any> {
  try {
    if (type.toLowerCase() === 'post') {
      const response: AxiosResponse = await axios.post(
        `${baseURL}${ending}`,
        null,
        {
          withCredentials: true,
        },
      );
      return response.data;
    } else if (type.toLowerCase() === 'get') {
      const response: AxiosResponse = await axios.get(`${baseURL}${ending}`);
      return response.data;
    } else {
      throw new Error('Invalid request type');
    }
  } catch (error) {
    console.error('API request failed:', error);

    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;

      if (axiosError.response) {
        const { status } = axiosError.response;

        if (status === 400) {
          console.error('Bad arguments (Wrong input)');
        } else if (status === 401) {
          console.error('Unauthorized (login again or not authorized)');
        } else if (status === 500) {
          console.error('Server error');
        } 
      } else {
        console.error('Timeout (Retry again later)');
      }
    } 

    throw error;
  }
}

export default APIHandler;
