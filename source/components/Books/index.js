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
export default class Books extends Component {
  componentDidMount() {
    const { actions } = this.props;

    actions.fetchBookAsync();
  }

  render() {
    const { books } = this.props;

    console.log(books);

    return <section className={Styles} />;
  }
}
