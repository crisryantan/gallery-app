import React from 'react';
import { shallow } from 'enzyme';
import Filter from '../index';

describe('<Filter />', () => {
  let subject = null;
  let orderBy;
  let changeFilter;

  beforeEach(() => {
    orderBy = 'Latest';
    changeFilter = jest.fn();
  });

  const buildSubject = customProps => {
    const props = {
      orderBy,
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
    subject.instance().handleChange();
    expect(changeFilter).toBeCalled();
  });
});
