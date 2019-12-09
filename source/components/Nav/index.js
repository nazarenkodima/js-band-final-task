// Core
import React, { Component } from 'react';

import Styles from './styles.m.css';

export default class Nav extends Component{

    render() {
        return (
            <section className={Styles.navigation}>
                <div className={Styles.logo}>
                    <h4>js band store / <span>Dima Nazarenko</span></h4>
                </div>
            </section>
        )
    }
}
