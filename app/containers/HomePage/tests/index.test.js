import React from 'react';
import { shallow } from 'enzyme';
import { Spin } from 'antd';
import { stubPhotos } from 'utils/stubdata';
import { HomePage } from '../index';

describe('<HomePage />', () => {
  let subject = null;
  let getPhotos;
  let photos;
  let loading;
  let totalPages;

  beforeEach(() => {
    getPhotos = jest.fn();
    photos = stubPhotos;
    loading = false;
    totalPages = 10;
  });

  const buildSubject = customProps => {
    const props = {
      getPhotos,
      photos,
      loading,
      totalPages,
    };
    return shallow(<HomePage {...Object.assign({}, props, customProps)} />);
  };

  it('renders a <HomePage> ', () => {
    subject = buildSubject();
    expect(subject.find(HomePage)).toBeDefined();
  });

  it('should render <Spin> when loading is true', () => {
    subject = buildSubject({ loading: true });
    expect(subject.find(Spin)).toBeDefined();
  });

  it('should render <EndSearchText /> span ', () => {
    subject = buildSubject();
    subject.setState({ page: 11 });
    expect(subject.find('.end-text')).toBeDefined();
  });

  it('should successfully call getPhotos api', () => {
    subject = buildSubject();
    subject.instance().loadMore();
    expect(getPhotos).toBeCalled();
  });

  it('should successfully changeFilter and call getPhotos', () => {
    const pageSize = 40;
    subject = buildSubject();
    subject.instance().changeFilter(pageSize, 'pageSize');
    expect(subject.state().pageSize).toEqual(pageSize);
    expect(getPhotos).toBeCalled();
  });
});
