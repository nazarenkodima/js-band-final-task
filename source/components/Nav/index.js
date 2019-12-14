// Core
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, NavLink } from 'react-router-dom';
import { isEmpty } from 'lodash';

// Components
import CartIcon from '../CartIcon';

// Book
import { book } from '../../navigation/book';

// Actions
import { authActions } from '../../bus/auth/actions';

// Styles
import Styles from './styles.m.css';

const matStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
    user: state.authReducer.user,
    cart: state.cartReducer.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...authActions,
      },
      dispatch,
    ),
  };
};

@withRouter
@connect(matStateToProps, mapDispatchToProps)
export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      avatar: null,
    };
  }

  componentDidMount() {
    const username = localStorage.getItem('username');
    const avatar = localStorage.getItem('avatar');

    this.setState({
      username,
      avatar,
    });
  }

  getNav = () => {
    const { username, avatar } = this.state;
    const { isAuthenticated, cart } = this.props;

    return isAuthenticated ? (
      <div className={Styles.navEnd}>
        <NavLink to={book.cart}>
          <CartIcon width={27} />
          {!isEmpty(cart) ? <span className={Styles.items}>{cart.length}</span> : null}
        </NavLink>
        <button type="button" onClick={this.logout}>
          Sign-out
        </button>
        <div className={Styles.avatar}>
          <img src={avatar} alt={username} />
        </div>
        <div className={Styles.username}>
          <h5>{username}</h5>
        </div>
      </div>
    ) : null;
  };

  logout = () => {
    const { actions, history } = this.props;

    actions.signOutAsync();
    history.push(book.signIn);
  };

  render() {
    const navigation = this.getNav();

    return (
      <section className={Styles.navigation}>
        <div>
          <div className={Styles.logo}>
            <h4>
              js band store / <span>Dima Nazarenko</span>
            </h4>
          </div>
        </div>
        {navigation}
      </section>
    );
  }
}
