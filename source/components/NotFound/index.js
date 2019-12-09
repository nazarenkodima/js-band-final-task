// Core
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { book} from '../../navigation/book'

import Styles from './styles.m.css';

const NotFound = () => {
    return (
        <section className={Styles.notFound}>
            <h1 className={Styles.numbers}>404</h1>
            <h2 className={Styles.title}>NOT FOUND</h2>
            <p>please, start from <NavLink to={book.signIn}>here</NavLink></p>
        </section>
    )
};

export default  NotFound;
