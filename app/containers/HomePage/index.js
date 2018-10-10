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
import { Spin } from 'antd';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Filter from 'components/Filter';
import Photo from 'components/Photo';

import reducer from './reducer';
import saga from './saga';

import {
  makeSelectLoading,
  makeSelectPhotos,
  makeSelectTotalPages,
} from './selectors';
import { getPhotos as getPhotosAction } from './actions';

const Wrapper = styled.div`
  padding: 50px;
`;

const PhotoWrapper = styled.ul`
  padding-left: 5px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const FooterWrapper = styled.div`
  text-align: center;
  border-radius: 4px;
  padding: 30px 50px;
  margin: 20px 0;
`;

const EndSearchText = styled.span`
  font-size: 36px;
  font-weight: 500;
`;

const defaultValues = {
  page: 0,
  pageSize: 20,
  query: undefined,
};

/* eslint-disable react/prefer-stateless-function, react/no-array-index-key */
export class HomePage extends React.PureComponent {
  state = {
    ...defaultValues,
    scrolling: false,
  };

  componentDidMount() {
    const { getPhotos } = this.props;
    const { page, pageSize, query } = this.state;
    getPhotos(page, pageSize, query);

    this.scrollListener = window.addEventListener('scroll', e => {
      this.handleScroll(e);
    });
  }

  changeFilter = (val, key) => {
    const { getPhotos } = this.props;
    // reset page back to 0 everytime query or pageSize is changed.
    this.setState({ [key]: val, page: 0 }, () => {
      const { page, pageSize, query } = this.state;
      getPhotos(page, pageSize, query);
    });
  };

  handleScroll = () => {
    const { totalPages } = this.props;
    const { page, scrolling } = this.state;
    if (scrolling) return;
    // avoid making more request if page exceeds totalPages
    if (page > totalPages) return;

    const lastLi = document.querySelector('ul.photos > li:last-child');
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    const bottomOffset = 69;
    if (pageOffset > lastLiOffset + bottomOffset) {
      this.loadMore();
    }
  };

  loadMore() {
    const { getPhotos } = this.props;
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        const { page, pageSize, query } = this.state;
        getPhotos(page, pageSize, query);
      },
    );
  }

  render() {
    const { totalPages, photos, loading } = this.props;
    const { page, query, pageSize } = this.state;

    return (
      <Wrapper>
        <Filter
          query={query}
          pageSize={pageSize}
          changeFilter={this.changeFilter}
        />
        <PhotoWrapper className="photos">
          {photos.map((photo, i) => (
            <Photo key={photo.id + i} photo={photo}>
              {photo.id}
            </Photo>
          ))}
        </PhotoWrapper>
        {page > totalPages && (
          <FooterWrapper>
            <EndSearchText className="end-text">End of search</EndSearchText>
          </FooterWrapper>
        )}
        {loading && (
          <FooterWrapper>
            <Spin />
          </FooterWrapper>
        )}
      </Wrapper>
    );
  }
}

HomePage.propTypes = {
  getPhotos: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  totalPages: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  photos: makeSelectPhotos(),
  totalPages: makeSelectTotalPages(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPhotos: (page, pageSize, query) =>
      dispatch(getPhotosAction(page, pageSize, query)),
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
