// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Book from '../Book';

// Actions
import { booksActions } from '../../bus/books/actions';

// Styles
import Styles from './styles.m.css';

const matStateToProps = state => {
  return {
    isFetching: state.uiReducer.isFetching,
    books: state.booksReducer.books,
    error: state.booksReducer.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...booksActions,
      },
      dispatch,
    ),
  };
};

@connect(matStateToProps, mapDispatchToProps)
export default class Books extends Component {
  componentDidMount() {
    const { actions } = this.props;

    actions.fetchBookAsync();
  }

  render() {
    const { books, error } = this.props;

    const booksJSX =
      error ||
      books.map(book => {
        return (
          <Book
            key={book.id}
            cover={book.cover}
            title={book.title}
            author={book.author}
            price={book.price}
          />
        );
      });

    return (
      <div className="container-fluid">
        <section className={Styles.booklist}>{booksJSX}</section>
      </div>
    );
  }
}
