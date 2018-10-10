import { getPhotos, getPhotosSuccess, getPhotosError } from '../actions';

import { GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_ERROR } from '../constants';

describe('HomePage actions', () => {
  describe('getPhotos', () => {
    it('has a type of GET_PHOTOS', () => {
      const page = 1;
      const pageSize = 20;
      const query = 'oldest';
      const expected = {
        type: GET_PHOTOS,
        page,
        pageSize,
        query,
      };

      expect(getPhotos(page, pageSize, query)).toEqual(expected);
    });
  });

  describe('getPhotosSuccess', () => {
    it('has a type of GET_PHOTOS_SUCCESS', () => {
      const data = {};
      const expected = {
        type: GET_PHOTOS_SUCCESS,
        data,
      };
      expect(getPhotosSuccess(data)).toEqual(expected);
    });
  });

  describe('getPhotosError', () => {
    it('has a type of GET_PHOTOS_ERROR', () => {
      const err = '';
      const expected = {
        type: GET_PHOTOS_ERROR,
        err,
      };
      expect(getPhotosError(err)).toEqual(expected);
    });
  });
});
