/**
 *
 * Filter
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import styled from 'styled-components';

const { Option } = Select;
const Wrapper = styled.div`
  margin-bottom: 20px;
`;

/* eslint-disable react/prefer-stateless-function */
class Filter extends React.PureComponent {
  handleChange = val => {
    const { changeFilter } = this.props;
    changeFilter(val);
  };

  render() {
    const { orderBy } = this.props;
    return (
      <Wrapper>
        <Select
          showSearch
          style={{ width: '100%' }}
          placeholder="Select a filter"
          optionFilterProp="children"
          defaultValue={orderBy}
          onChange={this.handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          <Option value="latest">Latest</Option>
          <Option value="oldest">Oldest</Option>
          <Option value="popular">Popular</Option>
        </Select>
      </Wrapper>
    );
  }
}

Filter.propTypes = {
  orderBy: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
};

export default Filter;
