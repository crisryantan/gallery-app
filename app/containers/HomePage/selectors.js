import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.get('homePage', initialState);

/**
 * Other specific selectors
 */

const makeSelectLoading = () =>
  createSelector(selectHomePageDomain, substate => substate.get('loading'));

const makeSelectPhotos = () =>
  createSelector(selectHomePageDomain, substate =>
    substate.get('photos').toJS(),
  );

const makeSelectTotalPages = () =>
  createSelector(selectHomePageDomain, substate => substate.get('totalPages'));

const makeSelectHomePage = () =>
  createSelector(selectHomePageDomain, substate => substate.toJS());

export default makeSelectHomePage;
export {
  selectHomePageDomain,
  makeSelectLoading,
  makeSelectPhotos,
  makeSelectTotalPages,
};
