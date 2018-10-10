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

import { makeSelectLoading, makeSelectPhotos } from './selectors';
import { getPhotos as getPhotosAction } from './actions';

const Wrapper = styled.div`
  padding: 50px;
`;

const PhotoWrapper = styled.ul`
  padding-left: 10px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const LoadingWrapper = styled.div`
  text-align: center;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
`;

/* eslint-disable react/prefer-stateless-function, react/no-array-index-key */
export class HomePage extends React.PureComponent {
  state = {
    page: 0,
    orderBy: 'latest',
    scrolling: false,
  };

  componentDidMount() {
    this.props.getPhotos();

    this.scrollListener = window.addEventListener('scroll', e => {
      this.handleScroll(e);
    });
  }

  changeFilter = orderBy => {
    const { getPhotos } = this.props;
    this.setState({ orderBy, page: 0 }, () => {
      getPhotos(0, orderBy);
    });
  };

  handleScroll = () => {
    const { page, scrolling } = this.state;
    if (scrolling) return;
    if (page > 10) return;

    const lastLi = document.querySelector('ul.photos > li:last-child');
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    const pageOffset = window.pageYOffset + window.innerHeight;
    const bottomOffset = 79;
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
        const { page, orderBy } = this.state;
        getPhotos(page, orderBy);
      },
    );
  }

  render() {
    const { photos, loading } = this.props;
    const { orderBy } = this.state;

    return (
      <Wrapper>
        <Filter orderBy={orderBy} changeFilter={this.changeFilter} />
        <PhotoWrapper className="photos">
          {photos.map((photo, i) => (
            <Photo key={photo.id + i} photo={photo}>
              {photo.id}
            </Photo>
          ))}
        </PhotoWrapper>
        {loading && (
          <LoadingWrapper>
            <Spin />
          </LoadingWrapper>
        )}
      </Wrapper>
    );
  }
}

HomePage.propTypes = {
  getPhotos: PropTypes.func.isRequired,
  photos: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
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
