// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Transition } from 'react-transition-group';
import gsap from 'gsap';

// Actions
import { uiActions } from '../../bus/ui/actions';

// Styles
import Styles from './styles.m.css';

const mapStateToProps = state => {
  return {
    failMessage: state.cartReducer.failMessage,
    error: state.booksReducer.error,
    errorViewBook: state.viewBookReducer.error,
    successMessage: state.cartReducer.successMessage,
    notificationIn: state.uiReducer.notificationIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...uiActions,
      },
      dispatch,
    ),
  };
};

@connect(mapStateToProps, mapDispatchToProps)
export default class Notification extends Component {
  animateNotificationEnter = notification => {
    gsap.fromTo(notification, 1, { y: -400, x: '0' }, { y: 100, x: '0' });
  };

  animateNotificationExit = notification => {
    const { actions } = this.props;
    gsap.fromTo(notification, 1, { y: 0, x: '0' }, { y: -400, x: '0' });
    actions.showNotification(false);
  };

  render() {
    const { successMessage, failMessage, error, errorViewBook, notificationIn } = this.props;

    return (
      <Transition
        in={notificationIn}
        timeout={4000}
        onEnter={this.animateNotificationEnter}
        onEntered={this.animateNotificationExit}
        mountOnEnter
        unmountOnExit
      >
        <section className={Styles.notification}>
          {successMessage ? (
            <span>
              {' '}
              <span role="img" aria-label="success">
                🙌{' '}
              </span>
              {successMessage}{' '}
            </span>
          ) : (
            <span>
              {' '}
              <span role="img" aria-label="fail">
                🤔
              </span>
              {failMessage || error || errorViewBook}
            </span>
          )}
        </section>
      </Transition>
    );
  }
}
