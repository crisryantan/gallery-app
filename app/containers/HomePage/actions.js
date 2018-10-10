/*
 *
 * HomePage actions
 *
 */

import { GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_ERROR } from './constants';

export function getPhotos(page = '1', orderBy = 'latest') {
  return {
    type: GET_PHOTOS,
    page,
    orderBy,
  };
}

export function getPhotosSuccess(photos) {
  return {
    type: GET_PHOTOS_SUCCESS,
    photos,
  };
}

export function getPhotosError(err) {
  return {
    type: GET_PHOTOS_ERROR,
    err,
  };
}
