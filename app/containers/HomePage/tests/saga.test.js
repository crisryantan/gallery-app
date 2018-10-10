import { takeEvery } from 'redux-saga/effects';
import { GET_PHOTOS } from '../constants';
import homepageSaga, { getPhotosSaga } from '../saga';

/* eslint-disable redux-saga/yield-effects */
describe('homepageSaga', () => {
  const homepageSagaTest = homepageSaga();

  it('should start a task to watch for the requestPageData action', () => {
    const expected = takeEvery(GET_PHOTOS, getPhotosSaga);
    const actual = homepageSagaTest.next().value;

    expect(actual).toEqual(expected);
  });
});
