import { getPhotos, getPhotosSuccess, getPhotosError } from '../actions';

import { GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_ERROR } from '../constants';

describe('HomePage actions', () => {
  describe('getPhotos', () => {
    it('has a type of GET_PHOTOS', () => {
      const page = 1;
      const orderBy = 'oldest';
      const expected = {
        type: GET_PHOTOS,
        page,
        orderBy,
      };

      expect(getPhotos(page, orderBy)).toEqual(expected);
    });
  });

  describe('getPhotosSuccess', () => {
    it('has a type of GET_PHOTOS_SUCCESS', () => {
      const photos = [];
      const expected = {
        type: GET_PHOTOS_SUCCESS,
        photos,
      };
      expect(getPhotosSuccess(photos)).toEqual(expected);
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
