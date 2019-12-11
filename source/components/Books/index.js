// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Book from '../Book';

// Actions
import { booksActions } from '../../bus/books/actions';
import { filtersActions } from '../../bus/filters/actions';

// Styles
import Styles from './styles.m.css';

const matStateToProps = state => {
  return {
    isFetching: state.uiReducer.isFetching,
    books: state.booksReducer.books,
    error: state.booksReducer.error,
    tasksFilter: state.filtersReducer.tasksFilter,
    price: state.filtersReducer.price,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...booksActions,
        ...filtersActions,
      },
      dispatch,
    ),
  };
};

@connect(matStateToProps, mapDispatchToProps)
export default class Books extends Component {
  componentDidMount() {
    const { actions } = this.props;

    actions.fetchBooksAsync();
  }

  componentWillUnmount() {
    const { actions } = this.props;

    actions.clearSearchFilter();
  }

  searchBooks = book => {
    const { tasksFilter } = this.props;

    return book.title.toLowerCase().includes(tasksFilter);
  };

  updateBooksFilter = event => {
    const { actions } = this.props;

    actions.updateBooksFilter(event.target.value.toLocaleLowerCase());
  };

  handleSelectChange = event => {
    const { actions } = this.props;

    const { target } = event;
    const { value } = target;
    const { name } = target;

    actions.updateSelectChange({ [name]: value });
  };

  filterPrice = book => {
    const { price } = this.props;

    switch (price) {
      case '15':
        return book.price < price;

      case '15-30':
        return book.price > 15 && book.price < 30;

      case '30':
        return book.price > price;

      default:
        return book;
    }
  };

  render() {
    const { books, error } = this.props;

    const booksJSX =
      error ||
      books
        .filter(this.searchBooks)
        .filter(this.filterPrice)
        .map(book => {
          return (
            <Book
              key={book.id}
              cover={book.cover}
              title={book.title}
              author={book.author}
              price={book.price}
              id={book.id}
            />
          );
        });

    return (
      <div className="container">
        <div className="mt-5 row">
          <div className="input-group input-group-sm mb-sm-3 col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="search by book name"
              onChange={this.updateBooksFilter}
            />
          </div>
          <div className="input-group input-group-sm mb-sm-3 col-md-3">
            <select
              className="custom-select"
              defaultValue="price"
              name="price"
              onChange={this.handleSelectChange}
            >
              <option value="price">Price</option>
              <option value="15">15 or less</option>
              <option value="15-30">15 - 30</option>
              <option value="30">30 or more </option>
            </select>
          </div>
        </div>
        <section className={Styles.booklist}>{booksJSX}</section>
      </div>
    );
  }
}
