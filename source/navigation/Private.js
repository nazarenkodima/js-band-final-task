// Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import { BooksList, BookPage } from '../pages';

// Routes
import { book } from './book';

export default class Private extends Component {
  render() {
    return (
      <Switch>
        <Route component={BookPage} path={book.book} />
        <Route component={BooksList} path={book.books} />
        <Redirect to={book.books} />
      </Switch>
    );
  }
}
