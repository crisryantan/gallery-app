/*
 *
 * HomePage actions
 *
 */

import { GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_ERROR } from './constants';

export function getPhotos(page = '0', pageSize, query) {
  return {
    type: GET_PHOTOS,
    page,
    pageSize,
    query,
  };
}

export function getPhotosSuccess(data) {
  return {
    type: GET_PHOTOS_SUCCESS,
    data,
  };
}

export function getPhotosError(err) {
  return {
    type: GET_PHOTOS_ERROR,
    err,
  };
}
