import React from 'react';
import { shallow } from 'enzyme';
import Filter from '../index';

describe('<Filter />', () => {
  let subject = null;
  let query;
  let changeFilter;
  let pageSize;

  beforeEach(() => {
    query = 'Latest';
    pageSize = 20;
    changeFilter = jest.fn();
  });

  const buildSubject = customProps => {
    const props = {
      query,
      pageSize,
      changeFilter,
    };
    return shallow(<Filter {...Object.assign({}, props, customProps)} />);
  };

  it('renders a <Filter>', () => {
    subject = buildSubject();
    expect(subject.find(Filter)).toBeDefined();
  });

  it('should call changeFilter successfully', () => {
    subject = buildSubject();
    subject.instance().handleChange(40, 'pageSize');
    expect(changeFilter).toBeCalled();
  });
});
