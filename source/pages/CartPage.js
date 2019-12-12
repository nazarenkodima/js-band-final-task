// Core
import React, { Component } from 'react';

// Components
import { Nav, Spinner, Cart } from '../components';

export default class BooksList extends Component {
  render() {
    return (
      <>
        <Nav />
        <Spinner />
        <Cart />
      </>
    );
  }
}
