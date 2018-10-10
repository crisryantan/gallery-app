import axios from 'axios';
import { clientId } from './stubdata';

export const axiosInstance = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getPhotos = ({ page, pageSize, query }) =>
  axiosInstance
    .get(
      `/search/photos/?query=${query}&page=${page}&per_page=${pageSize}&client_id=${clientId}`,
    )
    .then(response => response.data);
