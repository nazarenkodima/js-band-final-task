// Core
import React, { Component } from 'react';

// Components
import { Nav, Books, Spinner } from '../components';

export default class BooksList extends Component {
  render() {
    return (
      <>
        <Nav />
        <Spinner />
        <Books />
      </>
    );
  }
}
