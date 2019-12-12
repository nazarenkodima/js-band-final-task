// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { isEmpty } from 'lodash';
import cx from 'classnames';

// Components
import CartIcon from '../CartIcon';
import CartItem from '../CartItem';

// Book
import { book } from '../../navigation/book';

// Actions
import { viewBookActions } from '../../bus/viewBook/actions';

// Styles
import Styles from './styles.m.css';

const matStateToProps = state => {
  return {
    isFetching: state.uiReducer.isFetching,
    cart: state.cartReducer.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...viewBookActions,
      },
      dispatch,
    ),
  };
};

@connect(matStateToProps, mapDispatchToProps)
export default class Cart extends Component {
  render() {
    const { cart } = this.props;
    const cartPageStyles = cx('container position-relative', [Styles.cart]);
    const cartFullStyles = cx('list-group', [Styles.cartFull]);

    const cartEmptyJSX = (
      <div className={Styles.cartEmpty}>
        <CartIcon width={120} fill="#000" />
        <p>Cart is empty.</p>
        <p>
          {' '}
          Continue <Link to={book.books}>shopping</Link>
        </p>
      </div>
    );

    const cartJSX = (
      <ul className={cartFullStyles}>
        <CartItem />
      </ul>
    );

    return (
      <section className={cartPageStyles}>
        <div className={Styles.cartAction}>
          <button type="button" className="btn btn-sm btn-success" disabled={isEmpty(cart)}>
            Purchase
          </button>
        </div>
        {isEmpty(cart) ? cartEmptyJSX : cartJSX}
      </section>
    );
  }
}
