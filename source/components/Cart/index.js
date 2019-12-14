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
import Notification from '../Notification';

// Book
import { book } from '../../navigation/book';

// Actions
import { viewBookActions } from '../../bus/viewBook/actions';
import { cartActions } from '../../bus/cart/actions';
import { uiActions } from '../../bus/ui/actions';

// Styles
import Styles from './styles.m.css';

const matStateToProps = state => {
  return {
    isFetching: state.uiReducer.isFetching,
    cart: state.cartReducer.cart,
    cartTotal: state.cartReducer.cartTotal,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...viewBookActions,
        ...cartActions,
        ...uiActions,
      },
      dispatch,
    ),
  };
};

@connect(matStateToProps, mapDispatchToProps)
export default class Cart extends Component {
  componentDidMount() {
    const { actions } = this.props;

    if (!isEmpty(localStorage.getItem('cart'))) {
      const cart = JSON.parse(localStorage.getItem('cart'));

      actions.fillCart(cart);
      actions.booksReadyForPurchase();
      actions.getCartTotal();
    }
  }

  componentWillUnmount() {
    const { actions } = this.props;

    actions.showNotification(false);
  }

  purchase = () => {
    const { actions } = this.props;

    actions.purchaseAsync();
  };

  render() {
    const { cart, cartTotal, isFetching } = this.props;

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

    const cartListJSX = cart.map(cartItem => {
      return (
        <CartItem
          key={cartItem.id}
          totalPrice={cartItem.totalPrice}
          count={cartItem.count}
          title={cartItem.title}
        />
      );
    });

    const cartJSX = <ul className={cartFullStyles}>{cartListJSX}</ul>;

    return (
      <section className={cartPageStyles}>
        <div className={Styles.cartAction}>
          <button
            type="button"
            className="btn btn-sm btn-success"
            disabled={isEmpty(cart) || isFetching}
            onClick={this.purchase}
          >
            Purchase
          </button>
        </div>
        {isEmpty(cart) ? cartEmptyJSX : cartJSX}
        <div className="d-flex justify-content-end mt-2 mr-3">
          Total price: {parseFloat(cartTotal).toFixed(2)}
        </div>
        <Notification />
      </section>
    );
  }
}
