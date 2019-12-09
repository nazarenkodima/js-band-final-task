import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { hot } from 'react-hot-loader';

@hot(module)
export default class App extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from="/" to="/" />
      </Switch>
    );
  }
}
