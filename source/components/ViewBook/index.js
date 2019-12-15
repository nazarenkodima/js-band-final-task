// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';

// Components
import PriceWidget from '../PriceWidget';

// Actions
import { viewBookActions } from '../../bus/viewBook/actions';
import { counterActions } from '../../bus/counter/actions';
import { authActions } from '../../bus/auth/actions';
import { uiActions } from '../../bus/ui/actions';

// Styles
import Styles from './styles.m.css';
import Notification from '../Notification';

const matStateToProps = state => {
  return {
    isFetching: state.uiReducer.isFetching,
    book: state.viewBookReducer.book,
    error: state.viewBookReducer.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...viewBookActions,
        ...counterActions,
        ...authActions,
        ...uiActions,
      },
      dispatch,
    ),
  };
};
@withRouter
@connect(matStateToProps, mapDispatchToProps)
export default class ViewBook extends Component {
  componentDidMount() {
    const {
      book: { price },
      actions,
      match: { params },
    } = this.props;

    actions.fetchBookAsync(params.id);
    actions.setTotalPrice(price);
  }

  componentWillUnmount() {
    const { actions } = this.props;

    actions.isBooksAvailabilityMax(false);
    actions.showNotification(false);
    actions.clearBook();
    actions.resetError();
  }

  goBackToSignIn = () => {
    const { history, actions } = this.props;

    actions.signOutAsync();
    history.push('/');
  };

  render() {
    const {
      book,
      book: { tags },
      error,
    } = this.props;

    const viewBook = cx('row', [Styles.viewBook]);

    const tagJSX = tags
      ? tags.map(tag => {
          return <span key={tag}>{tag} &nbsp;</span>;
        })
      : null;

    const errorJSX = error ? (
      <div className="mt-5 row">
        <Notification />
        <p className="d-flex align-items-center m-auto">
          Please, start from{' '}
          <button type="button" className="btn btn-link" onClick={this.goBackToSignIn}>
            Sign-in{' '}
          </button>
        </p>
      </div>
    ) : null;

    return (
      <section className="container-fluid">
        {!error ? (
          <>
            <div className="row mt-5">
              <div className="col-sm-7">
                <div className={viewBook}>
                  <div className="col-sm-12 col-md-5">
                    <div>
                      <figure className={Styles.image}>
                        <img src={book.cover} alt={book.title} />
                      </figure>
                      <div className={Styles.description}>
                        Book description:<span>{book.description}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-6">
                    <div className={Styles.info}>
                      Title: <span>{book.title}</span>
                    </div>
                    <div className={Styles.info}>
                      Author: <span>{book.author}</span>
                    </div>
                    <div className={Styles.info}>
                      Level: <span>{book.level}</span>
                    </div>
                    <div className={Styles.info}>Tags: {tagJSX}</div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-3">
                <PriceWidget price={book.price} bookAvailability={book.count} />
              </div>
            </div>
            <Notification />
          </>
        ) : (
          <>{errorJSX}</>
        )}
      </section>
    );
  }
}
