// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

// Actions
import { booksActions } from '../../bus/books/actions';
import { viewBookActions } from '../../bus/viewBook/actions';

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
        ...viewBookActions,
      },
      dispatch,
    ),
  };
};

@connect(matStateToProps, mapDispatchToProps)
export default class Book extends Component {
  // viewBook = () => {
  //   const {actions, history, id }= this.props;
  //
  //   actions.fetchBookAsync(id);
  //   history.push(`/books/${id}`);
  // }

  render() {
    const { cover, title, author, price, id } = this.props;

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
              <Link
                to={`books/${id}`}
                params={{
                  id,
                  price,
                }}
                className="btn btn-info"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
