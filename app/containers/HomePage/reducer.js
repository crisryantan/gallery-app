/*
 *
 * HomePage2 reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_ERROR } from './constants';

export const initialState = fromJS({
  photos: [],
  loading: false,
});

function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS:
      return state.set('loading', true);

    case GET_PHOTOS_SUCCESS: {
      return state.set('loading', false).set('photos', fromJS(action.photos));
    }

    case GET_PHOTOS_ERROR: {
      return state.set('loading', false);
    }

    default:
      return state;
  }
}

export default homePageReducer;
