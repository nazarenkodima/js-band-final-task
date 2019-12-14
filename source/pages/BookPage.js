// Core
import React, { Component } from 'react';

// Components
import { Nav, ViewBook, Spinner } from '../components';

export default class BookPage extends Component {
  render() {
    return (
      <>
        <Nav />
        <Spinner />
        <ViewBook />
      </>
    );
  }
}
