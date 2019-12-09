// Core
import React, { Component } from 'react';

// Components
import { Nav, SignIn } from '../components';

export default class SignInPage extends Component {
    render () {
        return (
            <>
                <Nav />
                <SignIn/>
            </>
        );
    }
}
