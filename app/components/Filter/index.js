/**
 *
 * Filter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import { Select, Input } from 'antd';
import styled from 'styled-components';

const { Search } = Input;
const { Option } = Select;

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const StyledSearch = styled(Search)`
  margin-bottom: 10px;
  width: calc(100% - 100px);
  margin-right: 10px;

  @media (max-width: 492px) {
    width: 100%;
  }
`;

const StyledSelect = styled(Select)`
  margin-bottom: 10px;
  width: 80px;

  @media (max-width: 492px) {
    width: 100%;
    margin-bottom: 0px;
  }
`;

const pageSizes = [
  {
    value: 20,
    name: '20',
  },
  {
    value: 40,
    name: '40',
  },
  {
    value: 60,
    name: '60',
  },
];

/* eslint-disable react/prefer-stateless-function */
class Filter extends React.PureComponent {
  constructor(props) {
    super(props);
    this.changeFilterDebounce = debounce(this.props.changeFilter, 300);
  }

  handleChange = (val, key) => {
    const { changeFilter } = this.props;
    if (key === 'query') {
      this.changeFilterDebounce(val, key);
      return;
    }
    changeFilter(val, key);
  };

  render() {
    const { query, pageSize } = this.props;
    return (
      <Wrapper>
        <StyledSearch
          placeholder={`Enter keywords such as: "latest", "oldest", "popular" `}
          defaultValue={query}
          onChange={e => this.handleChange(e.currentTarget.value, 'query')}
        />
        <StyledSelect
          showSearch
          placeholder="Select page size"
          optionFilterProp="children"
          defaultValue={pageSize}
          onChange={val => this.handleChange(val, 'pageSize')}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {pageSizes.map(({ value, name }) => (
            <Option key={value}>{name}</Option>
          ))}
        </StyledSelect>
      </Wrapper>
    );
  }
}

Filter.propTypes = {
  query: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default Filter;
