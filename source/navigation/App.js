import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

// Routes

import Public from './Public';

@hot(module)
export default class App extends Component {

  render () {
    const isAuthenticated  = false;

    return isAuthenticated ? null : <Public />;
  }
}
