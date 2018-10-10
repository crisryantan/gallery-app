import React from 'react';
import { shallow } from 'enzyme';
import Photo from '../index';

describe('<Photo />', () => {
  let subject = null;
  let photo;

  beforeEach(() => {
    photo = { urls: { regular: 'Link here' } };
  });

  const buildSubject = customProps => {
    const props = {
      photo,
    };
    return shallow(<Photo {...Object.assign({}, props, customProps)} />);
  };

  it('renders a <Photo>', () => {
    subject = buildSubject();
    expect(subject.find(Photo)).toBeDefined();
  });
});
