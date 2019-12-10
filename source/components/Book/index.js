// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { booksActions } from '../../bus/books/actions';

// Styles
import Styles from './styles.m.css';

const matStateToProps = state => {
  return {
    isFetching: state.uiReducer.isFetching,
    books: state.booksReducer.books,
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
export default class Book extends Component {
  render() {
    const { cover, title, author, price } = this.props;

    return (
      <div className={Styles.bookItem}>
        <div className={Styles.book}>
          <figure className={Styles.image}>
            <img src={cover} alt={title} />
          </figure>
          <div className={Styles.bookBody}>
            <div>
              <h5 className={Styles.bookTitle}>{title}</h5>
              <p className={Styles.bookAuthor}>{author}</p>
            </div>

            <div className={Styles.bookFooter}>
              <p>Price: ${price}</p>
              <button type="button" className="btn btn-info">
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
