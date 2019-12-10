import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Routes
import Public from './Public';
import Private from './Private';

import { authActions } from '../bus/auth/actions';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
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

@hot(module)
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  componentDidMount() {
    const { actions } = this.props;
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (username && token) {
      actions.authenticate();
    }
  }

  render() {
    const { isAuthenticated } = this.props;

    return isAuthenticated ? <Private /> : <Public />;
  }
}
