import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

const clientId =
  '8f9fbd10d8bb0a7e69dd531aea77d5a0b84152b806286ed7f83f896c1987413b';

// How to sort the photos. Optional. (Valid values: latest, oldest, popular; default: latest)
export const getPhotos = ({ page, orderBy }) =>
  axiosInstance
    .get(`/photos/?page=${page}&order_by=${orderBy}&client_id=${clientId}`)
    .then(response => response.data);
