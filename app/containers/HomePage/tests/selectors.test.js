import { fromJS } from 'immutable';

import {
  selectHomePageDomain,
  makeSelectLoading,
  makeSelectPhotos,
} from '../selectors';

describe('selectHomepage', () => {
  it('should select the homePage state', () => {
    const homePageState = fromJS({
      photos: [],
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
