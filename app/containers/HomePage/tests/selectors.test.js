import { fromJS } from 'immutable';

import {
  selectHomePageDomain,
  makeSelectLoading,
  makeSelectPhotos,
  makeSelectTotalPages,
} from '../selectors';

describe('selectHomepage', () => {
  it('should select the homePage state', () => {
    const homePageState = fromJS({
      photos: [],
      totalPages: 0,
      loading: false,
    });
    const mockedState = fromJS({
      homepage: homePageState,
    });
    expect(selectHomePageDomain(mockedState)).toEqual(homePageState);
  });
});

describe('makeSelectLoading', () => {
  const selector = makeSelectLoading();
  it('should select the fetching state', () => {
    const loading = false;
    const mockedState = fromJS({
      homepage: {
        loading,
      },
    });
    expect(selector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectPhotos', () => {
  const selector = makeSelectPhotos();
  it('should select the photos state', () => {
    const photos = [];
    const mockedState = fromJS({
      homepage: {
        photos,
      },
    });
    expect(selector(mockedState)).toEqual(photos);
  });
});

describe('makeSelectTotalPages', () => {
  const selector = makeSelectTotalPages();
  it('should select the photos state', () => {
    const totalPages = 0;
    const mockedState = fromJS({
      homepage: {
        totalPages,
      },
    });
    expect(selector(mockedState)).toEqual(totalPages);
  });
});
