// Core
import React, { Component } from 'react';

// Styles
import Styles from './styles.m.css';

export default class CartItem extends Component {
  render() {
    const { title, count, totalPrice } = this.props;
    return (
      <li className="list-group-item d-flex justify-content-between">
        <div className={Styles.title}>
          <span>{title}</span>
          <span className="badge badge-primary badge-pill ml-auto">{count}</span>
        </div>
        <div />
        <div className=" d-flex justify-content-between">
          <span className={Styles.price}>${totalPrice.toFixed(2)}</span>
        </div>
      </li>
    );
  }
}
