/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_ERROR } from './constants';

export const initialState = fromJS({
  photos: [],
  loading: false,
  totalPages: 0,
});

/* eslint-disable camelcase */
function homePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS: {
      const { page } = action;
      // reset list of photos, means there is change of filter
      if (page === 0) {
        return state.set('loading', true).set('photos', fromJS([]));
      }
      return state.set('loading', true);
    }

    case GET_PHOTOS_SUCCESS: {
      const { results, total_pages } = action.data;
      return state
        .set('loading', false)
        .set('totalPages', total_pages)
        .set('photos', state.get('photos').concat(fromJS(results)));
    }

    case GET_PHOTOS_ERROR: {
      return state.set('loading', false);
    }

    default:
      return state;
  }
}

export default homePageReducer;
