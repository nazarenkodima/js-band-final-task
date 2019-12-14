// Core
import React from 'react';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';
import gsap from 'gsap';

// Styles
import Styles from './styles.m.css';

const mapStateToProps = state => {
  return {
    failMessage: state.cartReducer.failMessage,
    error: state.booksReducer.error,
    successMessage: state.cartReducer.successMessage,
    notificationIn: state.uiReducer.notificationIn,
  };
};

const Notification = props => {
  const { successMessage, failMessage, error, notificationIn } = props;

  const animateNotificationEnter = notification => {
    gsap.fromTo(notification, 1, { y: -400, x: '0' }, { y: 100, x: '0' });
  };

  const animateNotificationExit = notification => {
    gsap.fromTo(notification, 1, { y: 0, x: '0' }, { y: -400, x: '0' });
  };

  return (
    <Transition
      in={notificationIn}
      timeout={4000}
      onEnter={animateNotificationEnter}
      onEntered={animateNotificationExit}
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
            {failMessage || error}
          </span>
        )}
      </section>
    </Transition>
  );
};

export default connect(mapStateToProps, null)(Notification);
