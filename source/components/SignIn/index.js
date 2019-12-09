// Core
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'

import Styles from './styles.m.css';
import Avatar from '../../theme/images/userLogo.png';

const required = value => value ? undefined : 'Field is not valid';

const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength16 = maxLength(16);

const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength4 = minLength(4);

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (

    <div className={Styles}>
        <label className={Styles.inputLabel}>{label}</label>
        <div>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <input {...input} placeholder={label} type={type}/>
            {touched && ((error && <span className={Styles.errorSpan}>{error}</span>) || (warning && <span >{warning}</span>))}
        </div>
    </div>
);

class SignIn extends Component{

    handleSubmit = (event) => {
    console.log(event)
    };

    render() {

        const {pristine, submitting, isFetching } = this.props;

        const buttonMessage = isFetching ? 'Loading...' : 'Sign-In';

        return (
            <section className={Styles.signIn}>
                <div>
                    <img src={Avatar} alt="userLogo"/>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <Field
                            name="username" type="text"
                           component={renderField} label="Username"
                           validate={[ required, maxLength16, minLength4 ]}
                    />
                    <div>
                        <button className = { Styles.buttonStyle} disabled={pristine || submitting}type = 'submit'>
                        {buttonMessage}
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}

// eslint-disable-next-line no-class-assign
SignIn = reduxForm({
    form: 'signIn',
})(SignIn);

export default  SignIn;

