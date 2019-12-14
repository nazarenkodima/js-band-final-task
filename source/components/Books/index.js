// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

// Components
import Book from '../Book';
import Notification from '../Notification';

// Actions
import { booksActions } from '../../bus/books/actions';
import { filtersActions } from '../../bus/filters/actions';
import { uiActions } from '../../bus/ui/actions';
import { authActions } from '../../bus/auth/actions';

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
        ...uiActions,
        ...authActions,
      },
      dispatch,
    ),
  };
};
@withRouter
@connect(matStateToProps, mapDispatchToProps)
export default class Books extends Component {
  componentDidMount() {
    const { actions } = this.props;

    actions.fetchBooksAsync();
  }

  componentWillUnmount() {
    const { actions } = this.props;

    actions.clearSearchFilter();
    actions.showNotification(false);
    actions.resetError();
  }

  // eslint-disable-next-line no-shadow
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

  goBackToSignIn = () => {
    const { history, actions } = this.props;

    actions.signOutAsync();
    history.push('/');
  };

  render() {
    const { books, error } = this.props;

    const booksJSX = books
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

    const errorJSX = error ? (
      <div className="mt-5 row">
        <Notification />
        <p className="d-flex align-items-center m-auto">
          Please, start from{' '}
          <button type="button" className="btn btn-link" onClick={this.goBackToSignIn}>
            Sign-in{' '}
          </button>
        </p>
      </div>
    ) : null;

    return (
      <div className="container">
        {!error ? (
          <>
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
          </>
        ) : (
          <>{errorJSX}</>
        )}
      </div>
    );
  }
}
