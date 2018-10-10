/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';

import { makeSelectLoading, makeSelectPhotos } from './selectors';
import { getPhotos as getPhotosAction } from './actions';

const Wrapper = styled.div`
  padding: 100px;
`;

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.PureComponent {
  state = {
    page: 1,
  };

  componentDidMount() {
    this.props.getPhotos();
  }

  render() {
    const { photos } = this.props;
    console.log(photos);
    return (
      <Wrapper>
        <div>wasap</div>
      </Wrapper>
    );
  }
}

HomePage.propTypes = {
  getPhotos: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  photos: makeSelectPhotos(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPhotos: (page, orderBy) => dispatch(getPhotosAction(page, orderBy)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
