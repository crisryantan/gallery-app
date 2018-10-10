import { call, put, takeEvery } from 'redux-saga/effects';
import { getPhotos } from 'utils/api';
import { message } from 'antd';
import { GET_PHOTOS } from './constants';
import { getPhotosSuccess, getPhotosError } from './actions';

export function* getPhotosSaga(payload) {
  try {
    const data = yield call(getPhotos, payload);
    yield put(getPhotosSuccess(data));
  } catch (error) {
    message.error(
      'Something went wrong when fetching the resources, please refresh the page',
    );
    yield put(getPhotosError(error));
  }
}

export default function* defaultSaga() {
  yield takeEvery(GET_PHOTOS, getPhotosSaga);
}
