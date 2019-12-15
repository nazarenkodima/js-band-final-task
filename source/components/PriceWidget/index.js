// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import cx from 'classnames';

// Actions
import { counterActions } from '../../bus/counter/actions';
import { cartActions } from '../../bus/cart/actions';

// Styles
import Styles from './styles.m.css';

const matStateToProps = state => {
  return {
    count: state.counterReducer.count,
    totalPrice: state.counterReducer.totalPrice,
    isInputValid: state.counterReducer.isInputValid,
    book: state.viewBookReducer.book,
    isBooksAvailabilityMax: state.counterReducer.isBooksAvailabilityMax,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...counterActions,
        ...cartActions,
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
    const { actions, price, count, bookAvailability } = this.props;

    const incrementCount = count + 1;
    // eslint-disable-next-line no-unused-expressions
    incrementCount > bookAvailability ? actions.isInputValid(false) : null;
    // eslint-disable-next-line no-unused-expressions
    incrementCount === bookAvailability ? actions.isBooksAvailabilityMax(true) : null;

    actions.increment();
    actions.updateTotalPrice(price);
  };

  decrement = () => {
    const { actions, price, count, bookAvailability } = this.props;

    const decrementCount = count - 1;
    // eslint-disable-next-line no-unused-expressions
    decrementCount <= bookAvailability ? actions.isInputValid(true) : null;

    // eslint-disable-next-line no-unused-expressions
    decrementCount === bookAvailability ? actions.isBooksAvailabilityMax(true) : null;

    // eslint-disable-next-line no-unused-expressions
    decrementCount < bookAvailability ? actions.isBooksAvailabilityMax(false) : null;

    actions.decrement();
    actions.updateTotalPrice(price);
  };

  handleInputChange = event => {
    const { actions, count, bookAvailability } = this.props;

    const setCount = event.target.validity.valid ? event.target.value : 1;

    // eslint-disable-next-line no-unused-expressions
    event.target.value <= bookAvailability ? actions.isInputValid(true) : null;

    actions.setCount(setCount);

    const incrementCount = count + 1;
    // eslint-disable-next-line no-unused-expressions
    incrementCount > bookAvailability ? actions.isBooksAvailabilityMax(false) : null;
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

  addToCart = () => {
    const {
      actions,
      book: { id, title },
      count,
      totalPrice,
    } = this.props;

    actions.addBookToCartAsync({
      id,
      count,
      totalPrice,
      title,
    });

    actions.booksReadyForPurchase();
  };

  render() {
    const {
      price,
      count,
      bookAvailability,
      totalPrice,
      isInputValid,
      isBooksAvailabilityMax,
    } = this.props;

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
                type="text"
                pattern="[0-9]*"
                maxLength={2}
                value={count}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                onChange={this.handleInputChange}
              />
              <div className="d-flex flex-column">
                <button
                  type="button"
                  className={Styles.actionButton}
                  onClick={this.increment}
                  disabled={count >= bookAvailability}
                >
                  <span role="img" aria-label="up">
                    {' '}
                    🔼
                  </span>
                </button>
                <button
                  type="button"
                  className={Styles.actionButton}
                  onClick={this.decrement}
                  disabled={count === 1}
                >
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
            <div>
              <button
                type="button"
                className="btn btn-info d-flex ml-auto"
                disabled={!isInputValid || !count}
                onClick={this.addToCart}
              >
                add to cart
              </button>
              <br />
              {!isInputValid ? (
                <span className={Styles.infoMessage}>
                  We have {bookAvailability} books left in stock. Please choose appropriate amount{' '}
                </span>
              ) : null}
              {isBooksAvailabilityMax ? (
                <span className={Styles.showBooksAvailability}>
                  We have only {bookAvailability} books left in stock.
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
