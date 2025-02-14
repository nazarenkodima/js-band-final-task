// Core
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';

import { store } from './init/store';

// Styles
import './theme/init.css';

// App
import App from './navigation/App';

render(
  // eslint-disable-next-line react/jsx-filename-extension
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
