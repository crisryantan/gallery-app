import { fromJS } from 'immutable';
import { stubPhotos } from 'utils/stubdata';
import homePageReducer from '../reducer';

import { getPhotos, getPhotosSuccess, getPhotosError } from '../actions';

describe('homePageReducer', () => {
  let state;

  describe('homePageReducer - no photos', () => {
    beforeEach(() => {
      state = fromJS({
        photos: [],
        totalPages: 0,
        loading: false,
      });
    });

    it('returns the initial state', () => {
      expect(homePageReducer(undefined, {})).toEqual(state);
    });

    it('should handle the getPhotos action correctly', () => {
      const expectedResult = fromJS({
        photos: [],
        totalPages: 0,
        loading: true,
      });
      expect(homePageReducer(state, getPhotos(1, 'oldest'))).toEqual(
        expectedResult,
      );
    });

    it('should handle the getPhotosSuccess action correctly', () => {
      const data = {
        results: stubPhotos,
        total_pages: 10,
      };

      const expectedResult = fromJS({
        photos: stubPhotos,
        totalPages: 10,
        loading: false,
      });
      expect(homePageReducer(state, getPhotosSuccess(data))).toEqual(
        expectedResult,
      );
    });

    it('should handle the getPhotosError action correctly', () => {
      const err = 'Something went wrong';
      const expectedResult = fromJS({
        photos: [],
        totalPages: 0,
        loading: false,
      });
      expect(homePageReducer(state, getPhotosError(err))).toEqual(
        expectedResult,
      );
    });
  });

  describe('homePageReducer - with photos', () => {
    beforeEach(() => {
      state = fromJS({
        photos: stubPhotos,
        totalPages: 0,
        loading: false,
      });
    });

    it('should handle the getPhotos action correctly and empty photos', () => {
      const expectedResult = fromJS({
        photos: [],
        totalPages: 0,
        loading: true,
      });
      expect(homePageReducer(state, getPhotos(0, 'popular'))).toEqual(
        expectedResult,
      );
    });
  });
});
