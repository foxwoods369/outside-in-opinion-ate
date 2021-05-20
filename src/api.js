import axios from 'axios';
import {apiKey} from '../apikey';

const client = axios.create({
  baseURL: `https://outside-in-dev-api.herokuapp.com/${apiKey}`,
});

const api = {
  loadRestaurants() {
    return client.get('/restaurants').then(response => response.data);
  },
};

export default api;
