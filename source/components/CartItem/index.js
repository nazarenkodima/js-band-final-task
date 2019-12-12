// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { viewBookActions } from '../../bus/viewBook/actions';

// Styles
import Styles from './styles.m.css';

const matStateToProps = state => {
  return {
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
export default class CartItem extends Component {
  render() {
    return (
      <li className="list-group-item d-flex justify-content-between">
        <div className="flex-grow-1 d-flex">
          <span className={Styles.bookName}>BookName</span>
          <span className="badge badge-primary badge-pill m-auto">14</span>
        </div>
        <div className="flex-grow-1 d-flex justify-content-end">
          <span className={Styles.price}>100</span>
        </div>
      </li>
    );
  }
}
