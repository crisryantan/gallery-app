import MockAdapter from 'axios-mock-adapter';

import { getPhotos, axiosInstance } from '../api';
import { stubPhotos, clientId } from '../stubdata';

describe('(API)', () => {
  const mock = new MockAdapter(axiosInstance);

  afterEach(() => {
    mock.reset();
  });

  describe('getPhotos', () => {
    it('should return photos when calling api', async () => {
      const query = 'latest';
      const page = 5;
      const pageSize = 20;
      mock
        .onGet(
          `/search/photos/?query=${query}&page=${page}&per_page=${pageSize}&client_id=${clientId}`,
        )
        .reply(200, stubPhotos);

      const photosFromApi = await getPhotos({ page, pageSize, query });
      expect(photosFromApi).toEqual(stubPhotos);
    });
  });
});
