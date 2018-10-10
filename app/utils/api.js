import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const clientId =
  '8f9fbd10d8bb0a7e69dd531aea77d5a0b84152b806286ed7f83f896c1987413b';

export const getPhotos = ({ page, pageSize, query }) =>
  axiosInstance
    .get(
      `/search/photos/?query=${query}&page=${page}&per_page=${pageSize}&client_id=${clientId}`,
    )
    .then(response => response.data);
