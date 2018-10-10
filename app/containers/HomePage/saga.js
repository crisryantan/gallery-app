import { call, put, takeEvery } from 'redux-saga/effects';
import { getPhotos } from 'utils/api';
import { GET_PHOTOS } from './constants';
import { getPhotosSuccess, getPhotosError } from './actions';

export function* getPhotosSaga(payload) {
  try {
    const photos = yield call(getPhotos, payload);
    yield put(getPhotosSuccess(photos));
  } catch (error) {
    console.log(
      'Something went wrong when fetching the resources, please refresh the page',
    );
    yield put(getPhotosError(error));
  }
}

export default function* defaultSaga() {
  yield takeEvery(GET_PHOTOS, getPhotosSaga);
}
