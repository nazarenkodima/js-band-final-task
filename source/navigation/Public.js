// Core
import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Pages
import { SignInPage, FourOFour } from '../pages';

// Routes
import { book } from './book';

export default class Public extends Component {
    render () {
        return (
            <Switch>
                <Redirect exact from='/' to = { book.signIn } />
                <Route component = { SignInPage } path = { book.signIn } />
                <Route component= { FourOFour } path='*' exact />
            </Switch>
        );

    }
}
