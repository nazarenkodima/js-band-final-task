// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';

// Actions
import { counterActions } from '../../bus/counter/actions';

// Styles
import Styles from './styles.m.css';

const matStateToProps = state => {
  return {
    count: state.counterReducer.count,
    totalPrice: state.counterReducer.totalPrice,
    isInputValid: state.counterReducer.isInputValid,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...counterActions,
      },
      dispatch,
    ),
  };
};

@withRouter
@connect(matStateToProps, mapDispatchToProps)
export default class PriceWidget extends Component {
  componentWillUnmount() {
    const { actions } = this.props;

    actions.setCount(1);
    actions.isInputValid(true);
  }

  increment = () => {
    const { actions, price } = this.props;
    actions.increment();
    actions.updateTotalPrice(price);
  };

  decrement = () => {
    const { actions, price } = this.props;
    actions.decrement();
    actions.updateTotalPrice(price);
  };

  handleInputChange = event => {
    const { actions } = this.props;

    actions.setCount(event.target.value);
  };

  handleFocus = () => {
    const { actions, price } = this.props;

    actions.setBookPriceOnFocus(price);
  };

  handleBlur = event => {
    const { actions, count, bookAvailability } = this.props;

    const bookCountEntered = event.target.validity.valid ? event.target.value : count;

    // eslint-disable-next-line no-unused-expressions
    count > bookAvailability ? actions.isInputValid(false) : actions.isInputValid(true);

    actions.updateTotalPriceOnBlur(bookCountEntered);
  };

  render() {
    const { price, count, bookAvailability, totalPrice, isInputValid } = this.props;

    const widget = cx('card bg-light mb-3 border-0', [Styles.widget]);
    const field = cx('mb-3', [Styles.field]);

    return (
      <div className={widget}>
        <div className="card-body">
          <div className={field}>
            <div>Price, $</div>
            <div>{price}</div>
          </div>
          <div className={field}>
            <div>Count</div>
            <div className="d-flex align-items-center">
              <input
                type="number"
                pattern="[0-9]*"
                value={count}
                min="1"
                max={bookAvailability}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                onChange={this.handleInputChange}
              />
              <div className="d-flex flex-column">
                <button type="button" className={Styles.actionButton} onClick={this.increment}>
                  <span role="img" aria-label="up">
                    {' '}
                    🔼
                  </span>
                </button>
                <button type="button" className={Styles.actionButton} onClick={this.decrement}>
                  <span role="img" aria-label="down">
                    🔽
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className={field}>
            <div>Total Price</div>
            <div> {totalPrice ? totalPrice.toFixed(2) : null}</div>
          </div>
          <div className="d-flex justify-content-end">
            {isInputValid ? (
              <button type="button" className="btn btn-info" disabled={!isInputValid}>
                add to cart
              </button>
            ) : (
              <div>
                <button
                  type="button"
                  className="btn btn-info d-flex ml-auto"
                  disabled={!isInputValid}
                >
                  add to cart
                </button>
                <br />
                <span className={Styles.infoMessage}>
                  We have {bookAvailability} books left in stock. Please choose appropriate amount{' '}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
